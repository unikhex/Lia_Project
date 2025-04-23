const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const params = {
      TableName: 'ToDoTable',  // Replace with your DynamoDB table name
      Item: {
        id: uuidv4(),           // Unique ID for the task
        task: data.task,        // Task from the client
        createdAt: Date.now()
      }
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task added successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create task' })
    };
  }
};
