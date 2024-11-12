export const handler = async (event) => {
  const slackURL = process.env.SLACK_URL;
  if (!slackURL) {
    throw new Error('SLACK_URL environment variable is not set');
  }
  if (!event.issue || !event.issue.html_url) {
    throw new Error('No issue data found in event');
  }

  const ret = {'text':`Issue Created: ${event.issue.html_url}`};

  const fetched = await fetch(slackURL, {
    method: 'POST',
    body: JSON.stringify(ret)
  });
  
  const body = await fetched.text();

  const response = {
    statusCode: 201,
    body: ret
  };

  return response;
};
