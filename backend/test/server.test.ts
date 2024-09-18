import { server } from "../src/server";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

// Assumes database is empty.
describe('Card App API Tests', () => {

  const mockEntry = {id: '1', title: "Test Title 1", description: "Test Description 1", scheduled_date: new Date('2024-09-19T12:00:00Z'), created_at: new Date('2024-09-19T12:00:00Z'), updated_at: new Date('2024-09-19T12:00:00Z')};
  const mockResponse = {title: "Test Title 1", description: "Test Description 1", scheduled_date: new Date('2024-09-19T12:00:00Z').toISOString(), created_at: new Date('2024-09-19T12:00:00Z').toISOString(), updated_at: new Date('2024-09-19T12:00:00Z').toISOString()};

  // Test for GET /get/ with empty database
  it('GET /get/ on empty database - should return 200 with empty array', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/get/', 
    });

    expect(response.statusCode).toBe(200);  
    expect(response.json()).toEqual([]);  
  });

  // Test for POST /create/ with mockEntry
  it('POST /create/ - should return 200 with created post', async () => {

    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload:  mockEntry
    });

    expect(response.statusCode).toBe(200); 
    expect(response.json()).toMatchObject(mockResponse);
    expect(response.json().id).toBeDefined();  
  });

  // Test for GET /get/ with database with value
  it('GET /get/ on database with values - should return 200 with all values (array with one element mockEntry)', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/get/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject([mockResponse]);
  });

  // Test for GET /get/:id with database with value
  it('GET /get/1 on database with value - should return 200 with mockEntry', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/get/1',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject(mockResponse);
    expect(response.json().id).toBeDefined();
  });

  // Test for PUT /update/:id with database with value
  it('GET /update/1 on database with value - should return 200 and update entry in database', async () => {

    const response = await server.inject({
      method: 'PUT',
      url: '/update/1',
      payload: mockEntry
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({msg: 'Updated successfully'})
  });

  // Test for DELETE /delete/:id with database with value
  it('DELETE /delete/1 on database with value - should return 200 and delete entry from database', async () => {

    const response = await server.inject({
      method: 'DELETE',
      url: '/delete/1',
      payload: mockEntry
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({msg: 'Deleted successfully'})
  });

  // Test for POST /create/ with missing required fields
  it('POST /create/ - should return 500 when required fields are missing', async () => {
    const incompleteEntry = { title: 'New Entry' };  // Missing scheduled_date, description, created_at, updated_at

    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: incompleteEntry,
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toStrictEqual({ msg: 'Error creating entry' });
  });

  // Test for GET /get/:id with non-existent ID
  it('GET /get/:id for non-existent ID - should return 500 when entry not found', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/get/999',  // Non-existent ID
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toStrictEqual({ msg: 'Error finding entry with id 999' });
  });


  // Test for PUT /update/:id with incorrect/non-existent ID
  it('PUT /update/:id for non-existent ID - should return 500 when entry not found', async () => {
    const updatedEntry = { id: '999', title: 'Updated Entry', scheduled_date: new Date() };

    const response = await server.inject({
      method: 'PUT',
      url: '/update/999',
      payload: updatedEntry,
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toStrictEqual({ msg: 'Error updating' });
  });

  // Test for DELETE /delete/:id with incorrect/non-existent ID
  it('DELETE /delete/:id for non-existent ID - should return 500 when entry not found', async () => {

    const response = await server.inject({
      method: 'DELETE',
      url: '/delete/999',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toStrictEqual({ msg: 'Error deleting entry' });
  });
});