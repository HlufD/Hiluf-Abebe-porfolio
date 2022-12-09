const ProgressBar = ({ lebele, percent }) => {
  return (
    <div className="proress-bar">
      <div className="labele">
        <p>{lebele}</p>
        <p>{percent}</p>
      </div>
      <div className="actual-progress-con">
        <div className="actual-progress" style={{ width: `${percent}` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
