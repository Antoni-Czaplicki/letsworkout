"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState } from "react";
import { Holiday } from "@/types/holiday";
import { Slider } from "@/components/ui/slider";
import { InputPhoto } from "@/components/input-photo";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Chevron } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

export default function MainForm({ holidays }: { holidays: Holiday[] }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number>(8);
  const [photo, setPhoto] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<Date | undefined>(undefined);

  const currentHolidays = holidays.filter(
    (holiday) => holiday.date.toDateString() === date?.toDateString(),
  );
  const availableTimeSlots = date ? getAvailableTimeSlots(date) : [];

  function getAvailableTimeSlots(date: Date): Date[] {
    // mock function to get available time slots for a given date
    return Array.from({ length: 8 }, (_, i) => {
      const hour = i / 2 + 12;
      if (
        hour % 2 === 0 ||
        Math.floor(hour) % 6 === date.getDay() ||
        Math.floor(hour) % 6 === date.getMonth()
      ) {
        return null;
      }
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Math.floor(hour),
        (hour % 1) * 60,
      );
    }).filter((slot) => slot !== null);
  }

  async function handleSubmit() {
    console.log({
      firstName,
      lastName,
      email,
      age,
      photo,
      date,
      timeSlot,
    });
  }

  return (
    <form
      className="flex w-full flex-col gap-12"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium">Personal info</h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              className="w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              className="w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="age">Age</Label>
            <Slider
              id="age"
              className="w-full"
              value={age ? [age] : [8]}
              onValueChange={(value) => setAge(value[0])}
              min={8}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="photo">Photo</Label>
            <InputPhoto
              id="photo"
              photo={photo}
              setPhoto={(file) => setPhoto(file)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-medium">Your workout</h2>{" "}
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex grow flex-col gap-2">
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              showOutsideDays={false}
              weekStartsOn={1}
              components={{
                Chevron: ({ orientation, ...props }) =>
                  orientation === "right" ? (
                    <span className="text-input">▶</span>
                  ) : orientation === "left" ? (
                    <span className="text-input">◀</span>
                  ) : (
                    <Chevron orientation={orientation} {...props} />
                  ),
                DayButton: ({ className, ...props }) => {
                  return (
                    <CalendarDayButton
                      {...props}
                      className={cn(className, "rounded-full!")}
                    />
                  );
                },
              }}
              disabled={[
                { dayOfWeek: [0] },
                ...holidays
                  .filter((holiday) => holiday.type === "NATIONAL_HOLIDAY")
                  .map((holiday) => holiday.date),
              ]}
              className="w-full rounded-md border bg-white"
            />
            {date &&
              currentHolidays.some(
                (holiday) => holiday.type === "OBSERVANCE",
              ) && (
                <p className="flex items-center gap-1 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 16C6.41775 16 4.87104 15.5308 3.55544 14.6518C2.23985 13.7727 1.21447 12.5233 0.608967 11.0615C0.00346629 9.59966 -0.15496 7.99113 0.153721 6.43928C0.462403 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462401 6.43928 0.153719C7.99113 -0.154963 9.59966 0.00346375 11.0615 0.608965C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16ZM7.00667 12C7.00667 12.2652 7.11203 12.5196 7.29956 12.7071C7.4871 12.8946 7.74145 13 8.00667 13C8.27189 13 8.52624 12.8946 8.71378 12.7071C8.90131 12.5196 9.00667 12.2652 9.00667 12V7.40667C9.00667 7.27535 8.9808 7.14531 8.93055 7.02398C8.88029 6.90266 8.80664 6.79242 8.71378 6.69956C8.62092 6.6067 8.51068 6.53304 8.38935 6.48279C8.26803 6.43253 8.13799 6.40667 8.00667 6.40667C7.87535 6.40667 7.74531 6.43253 7.62399 6.48279C7.50266 6.53304 7.39242 6.6067 7.29956 6.69956C7.2067 6.79242 7.13305 6.90266 7.08279 7.02398C7.03254 7.14531 7.00667 7.27535 7.00667 7.40667V12ZM8 3C7.77321 3 7.55152 3.06725 7.36295 3.19325C7.17438 3.31925 7.02741 3.49833 6.94062 3.70786C6.85383 3.91738 6.83113 4.14794 6.87537 4.37037C6.91961 4.5928 7.02882 4.79712 7.18919 4.95748C7.34955 5.11785 7.55387 5.22706 7.7763 5.2713C7.99873 5.31555 8.22929 5.29284 8.43881 5.20605C8.64834 5.11926 8.82743 4.97229 8.95342 4.78372C9.07942 4.59515 9.14667 4.37346 9.14667 4.14667C9.14667 3.84255 9.02586 3.55089 8.81082 3.33585C8.59578 3.12081 8.30412 3 8 3Z"
                      fill="#CBB6E5"
                    />
                  </svg>
                  It is{" "}
                  {currentHolidays
                    .filter((holiday) => holiday.type === "OBSERVANCE")
                    .map((holiday) => holiday.name)
                    .join(", ")}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-2 sm:w-20">
            {availableTimeSlots.length > 0 && (
              <>
                <Label htmlFor="timeSlot">Time</Label>
                <div className="flex flex-row flex-wrap gap-2 sm:flex-col">
                  {availableTimeSlots.map((slot, index) => (
                    <Toggle
                      key={index}
                      pressed={
                        (timeSlot &&
                          timeSlot.toISOString() === slot.toISOString()) ||
                        false
                      }
                      onPressedChange={() => {
                        setTimeSlot(
                          timeSlot?.toISOString() === slot.toISOString()
                            ? undefined
                            : slot,
                        );
                      }}
                    >
                      {slot.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Toggle>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full sm:w-auto"
        disabled={
          !firstName ||
          !lastName ||
          !email ||
          !age ||
          !photo ||
          !date ||
          !timeSlot
        }
      >
        Send Application
      </Button>
    </form>
  );
}
