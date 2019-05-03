const axios = require("require");
const { submitCognitive } = require('./actions/cognitiveAssessment');
const { ensureItSetup } = require("./itestSetup");
const { newConnection, closeConnectionQuietly } = require("../libs/dbUtils");
const { clearAllEntriesForEvent } = require("../testUtils/dynamoTestUtils");


describe('Cognitive Assessment Handler', () => {
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
    let startTime = new Date();
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 3);

    const request = {
      timestamp: new Date().getTime(),
      endTime,
      startTime,
      timezoneOffset,
      reporter: adminUser.uuid,
      patientUuid: adminUser.uuid,
      testType: 'Cognitive',
      version: 'naming-animals-v1',
      elapsedTime: 97,
      attempts: 2,
      score: 15
    };

    const result = await axios.post("/cog", request)

    const expectedOutput = {
      patient_uuid: adminUser.uuid,
      test: request.test
    };

    expect(result.data).toMatchObject(expectedOutput)
  });

  it('List Tests, non empty', async () => {
    let startTime = new Date();
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 3);

    const request = {
      timestamp: new Date().getTime(),
      endTime,
      startTime,
      timezoneOffset,
      reporter: adminUser.uuid,
      patientUuid: adminUser.uuid,
      testType: 'Cognitive',
      version: 'naming-animals-v1',
      elapsedTime: 97,
      attempts: 2,
      score: 15
    };

    await axios.post("/cog", request);

    const result = axios.get(`/cog/${adminUser.uuid}`);
    expect(result.data.allCogs).toHaveLength(1);
    expect(result.data.allCogs[0].score).toEqual(request.score);
  });

});