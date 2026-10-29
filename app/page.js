export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-light py-5 border-bottom">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge mb-3 p-1">
                For Afterschool Programs, Camps & Educators
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Plan Engaging Youth Programs in Minutes
              </h1>

              <p className="lead text-secondary mb-4">
                Generate activities, scavenger hunts, lesson plans,
                printables, and enrichment resources without spending
                hours searching Pinterest or Google.
              </p>

              <div className="d-flex gap-3">
                <button className="btn btn-primary btn-lg">
                  Generate an Activity
                </button>

                <button className="btn btn-outline-secondary btn-lg">
                  View Pricing
                </button>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">
                    Example Activity
                  </h5>

                  <p>
                    <strong>Title:</strong> Build a Balloon Rocket
                  </p>

                  <p>
                    <strong>Age:</strong> 8-10
                  </p>

                  <p>
                    <strong>Objective:</strong> Explore force and motion.
                  </p>

                  <p>
                    <strong>Materials:</strong> Balloon, string,
                    tape, straw.
                  </p>

                  <button className="btn btn-primary">
                    Save Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Everything You Need to Run Great Programs
          </h2>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-lightbulb display-6 text-primary"></i>
                  <h5 className="mt-3">Activity Generator</h5>
                  <p className="text-secondary">
                    Create age-appropriate activities in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-search display-6 text-primary"></i>
                  <h5 className="mt-3">Scavenger Hunts</h5>
                  <p className="text-secondary">
                    Generate indoor, outdoor, and themed hunts.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-journal-bookmark display-6 text-primary"></i>
                  <h5 className="mt-3">Resource Library</h5>
                  <p className="text-secondary">
                    Save and organize activities for future use.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-award display-6 text-primary"></i>
                  <h5 className="mt-3">Printables</h5>
                  <p className="text-secondary">
                    Create certificates, journals, worksheets, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Built for Informal Learning
          </h2>

          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Afterschool Programs</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Camps</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Libraries</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Nonprofits</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Simple Pricing
          </h2>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h4>Free</h4>
                  <h2>$0</h2>

                  <ul className="list-unstyled mt-4">
                    <li>5 Activities / Month</li>
                    <li>3 Scavenger Hunts</li>
                    <li>Basic Printables</li>
                  </ul>

                  <button className="btn btn-outline-primary">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-primary shadow">
                <div className="card-body text-center">
                  <h4>Educator</h4>
                  <h2>$15/mo</h2>

                  <ul className="list-unstyled mt-4">
                    <li>Unlimited Activities</li>
                    <li>Unlimited Hunts</li>
                    <li>Save Resources</li>
                    <li>PDF Exports</li>
                  </ul>

                  <button className="btn btn-primary">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">
            Spend Less Time Planning
          </h2>

          <p className="lead mb-4">
            Create better enrichment programs and activities in minutes.
          </p>

          <button className="btn btn-light btn-lg">
            Try Activity Vault Free
          </button>
        </div>
      </section>
    </>
  );
}