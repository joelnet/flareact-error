export const TimelineItem = ({ children, direction = "r", time, flag }) => (
  <li>
    <div className={`direction-${direction}`}>
      <div className="flag-wrapper">
        <span className="flag">{flag}</span>
        <span className="time-wrapper">
          <span className="time">{time}</span>
        </span>
      </div>
      <div className="desc">{children}</div>
    </div>
  </li>
);
