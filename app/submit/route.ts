export async function POST(request: Request) {
  return Response.json({
    success: true,
    message: "Form submitted successfully!",
  });
}
