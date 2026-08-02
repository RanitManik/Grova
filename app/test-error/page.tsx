export default function TestErrorPage() {
  throw new Error(
    "This is a simulated test error to trigger the error boundary.",
  );
}
