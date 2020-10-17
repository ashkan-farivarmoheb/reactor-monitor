const lambda = require('../../../src/handlers/processIndications.js');

// This includes all tests for helloFromLambdaHandler()
describe('Test for processIndications', function () {
    // This test invokes helloFromLambdaHandler() and compare the result 
    it('Verifies successful response', async () => {
        // Invoke helloFromLambdaHandler()
        const result = await lambda.handler();
        /* 
            The expected result should match the return from your Lambda function.
            e.g. 
            if you change from `const message = 'Hello from Lambda!';` to `const message = 'Hello World!';` in processIndications.js
            you should change the following line to `const expectedResult = 'Hello World!';`
        */
        // const expectedResult = 'Hello from Lambda!';
        // // Compare the result with the expected result
        // expect(result).toEqual(expectedResult);
    });
});
