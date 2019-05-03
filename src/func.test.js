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
    let startTime = new Date();
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 3);
    
    const assessment= [
      {number: 1, text: "Writing checks, paying bills, balancing checkbook", score: null},
      {number: 2, text: "Assembling tax records, business affairs, or papers.", score: null},
      {number: 3, text: "Shopping alone for clothes, household necessities, or groceries.", score: null},
      {number: 4, text: "Playing a game of skill, working on a hobby."},
      {number: 5, text: "Heating water, making a cup of coffee, turning off stove after use.", score: null},
      {number: 6, text: "Preparing a balanced meal.", score: null},
      {number: 7, text: "Keeping track of current events.", score: null},
      {number: 8, text: "Paying attention to, understanding, discussing TV book, magazine.", score: null},
      {number: 9, text: "Remembering appointments, family occasions, holidays, medications", score: null},
      {number: 10, text: "Traveling out of neighborhood, driving, arranging to take busess", score: null }
    ];


    const request = {
      timestamp: new Date().getTime(),
      endTime: endTime,
      start: startTime,
      timezoneOffset,
      reporter: adminUser.uuid,
      patientUuid: adminUser.uuid,
      testType: 'Functional',
      version: 'func-v1',
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
      endTime: endTime,
      start: startTime,
      timezoneOffset,
      reporter: adminUser.uuid,
      patientUuid: adminUser.uuid,
      testType: 'Cognitive',
      version: 'naming-animals-v1',
      attempts: 2,
      score: 15
    };

    await axios.post("/cog", request);

    const result = axios.get(`/cog/${adminUser.uuid}`);
    expect(result.data.allCogs).toHaveLength(1);
    expect(result.data.allCogs[0].score).toEqual(request.score);
  });
  
});