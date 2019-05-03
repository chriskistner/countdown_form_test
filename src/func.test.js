const axios = require("require");
const { submitFunctional } = require('./actions/functionalAssessment');
const { ensureItSetup } = require("./itestSetup");
const { newConnection, closeConnectionQuietly } = require("../libs/dbUtils");
const { clearAllEntriesForEvent } = require("../testUtils/dynamoTestUtils");


describe('Functional Assessment Handler', () => {
  let adminUser;
  let conn;
  const timezoneOffset = 330 // 5:30 differ from UTC to local time


  afterAll(() => {
    closeConnectionQuietly(conn)
  });

  beforeAll( async done => {
    let conn = newConnection();
    await ensureItSetup(conn)

    const result = axios.get('login/access-token')
    adminUser = result.data;

    done();
  });

  beforeEach(() => {
    return clearAllEntriesForEvent('COG')
  });

  it("List Tests, empty", async () => {
    const result = await axios.get(`/cog/${adminUser.uuid}`);
    expect(result.data.allVitals).toEqual([]);
  });

  it('Post Cognitive Test', async () => {
    let startTime = new Date().getTime();
    let endTime = new Date().getTime();
    endTime += 300000;

    let elapsedTime = Math.round((endTime - startTime) / 1000);
 
    const request = {
      timestamp: new Date().getTime(),
      endTime,
      startTime,
      timezoneOffset,
      reporter: adminUser.uuid,
      patientUuid: adminUser.uuid,
      testType: 'Functional',
      version: 'func-v1',
      elapsedTime,
      q1: 0,
      q2: 1,
      q3: 2,
      q4: 0,
      q5: 0,
      q6: 1,
      q7: 2,
      q8: 1,
      q9: 1,
      q10: 1,
      total: 9
    };

    const result = await axios.post("/cog", request)

    const expectedOutput = {
      patient_uuid: adminUser.uuid,
      test: request.test
    };

    expect(result.data).toMatchObject(expectedOutput)
  });

  it('List Tests, non empty', async () => {
    let startTime = new Date().getTime();
    let endTime = new Date().getTime();
    endTime += 300000;

    let elapsedTime = Math.round((endTime - startTime) / 1000);

    const request = {
      timestamp: new Date().getTime(),
      endTime,
      startTime,
      timezoneOffset,
      reporter: adminUser.uuid,
      patientUuid: adminUser.uuid,
      testType: 'Functional',
      version: 'func-v1',
      elapsedTime,
      q1: 0,
      q2: 1,
      q3: 2,
      q4: 0,
      q5: 0,
      q6: 1,
      q7: 2,
      q8: 1,
      q9: 1,
      q10: 1,
      score: 9
    };

    await axios.post("/cog", request);

    const result = axios.get(`/cog/${adminUser.uuid}`);
    expect(result.data.allCogs).toHaveLength(1);
    expect(result.data.allCogs[0].score).toEqual(request.score);
  });
  
});