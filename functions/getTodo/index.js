const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    const params = {
      TableName: 'ToDoTable'
    };

    const data = await dynamodb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch tasks' })
    };
  }
};
