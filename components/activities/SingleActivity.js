

export default function SingleActivity({activity}){

    return(
        <div className="card shadow-sm h-100">
  <div className="card-header bg-primary text-white">
    <span className="badge bg-light text-dark me-2">
      Grade 3-5
    </span>
    Science
  </div>

  <div className="card-body">
    <h5 className="card-title">
      Animal Adaptation Challenge
    </h5>

    <p className="card-text text-muted">
      Students work in teams to design a new animal and explain
      how its adaptations help it survive in a chosen habitat.
    </p>

    <div className="mb-3">
      <small className="text-muted d-block">
        <strong>Duration:</strong> 30 Minutes
      </small>

      <small className="text-muted d-block">
        <strong>Group Size:</strong> Small Groups
      </small>

      <small className="text-muted d-block">
        <strong>Materials:</strong> Paper, Markers
      </small>
    </div>

    <div className="d-flex flex-wrap gap-1 mb-3">
      <span className="badge bg-secondary">STEM</span>
      <span className="badge bg-secondary">Collaboration</span>
      <span className="badge bg-secondary">Critical Thinking</span>
    </div>
  </div>

  <div className="card-footer bg-white">
    <div className="d-flex justify-content-between">
      <button className="btn btn-outline-primary btn-sm">
        View
      </button>

      <button className="btn btn-outline-success btn-sm">
        Save
      </button>
    </div>
  </div>
</div>
    )
}

