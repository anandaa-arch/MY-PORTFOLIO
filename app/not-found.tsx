export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-2">Sorry, we couldn&#39;t find what you&#39;re looking for.</p>
      <a href="/" className="text-accent inline-block mt-4">Go home →</a>
    </div>
  );
}
