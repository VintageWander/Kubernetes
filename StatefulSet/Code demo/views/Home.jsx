const React = require("react");

const Home = ({ test, logs }) => {
  return (
    <div className="home">
      <h1>Home</h1>
      <p>
        The test value sent from env is: {test || "No env variable received"}
      </p>
      <form action="/create" method="POST">
        <input type="text" name="log" placeholder="Write your log here" />
        <input type="submit" value="Submit" />
      </form>
      {logs !== undefined &&
        logs.map((log, index) => {
          return (
            <p key={index}>
              {log.message}
              <form action={`/delete/${log.message}`} method="POST">
                <input type="submit" value="Delete" />
              </form>
            </p>
          );
        })}
    </div>
  );
};

module.exports = Home;
