export default function Fee() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-12">
          <p className="eyebrow">Founding Instructor Course Fee</p>
          <h2 className="h-display max-w-2xl">An exclusive introductory rate.</h2>
        </div>

        <div className="card card-featured max-w-lg mx-auto flex flex-col items-center text-center gap-6 py-12">
          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl font-light tracking-tight">&pound;250</span>
            <div className="flex flex-col items-start">
              <span className="text-xl text-muted line-through">&pound;500</span>
              <span className="text-xs uppercase tracking-widest text-muted">Standard course fee</span>
            </div>
          </div>
          <p className="text-muted leading-relaxed max-w-sm">
            Founding Instructors receive an exclusive 50% introductory rate in recognition of joining
            the academy&rsquo;s inaugural cohort and providing constructive feedback following the course.
          </p>
          <p className="text-sm text-muted">Places are limited to the first Founding Instructor cohort only.</p>
        </div>
      </div>
    </section>
  );
}
