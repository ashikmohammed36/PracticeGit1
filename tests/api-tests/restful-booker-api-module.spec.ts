import { expect } from '@playwright/test';
import { test } from '../../fixtures/hooks-fixture';
import apiPathData from '../../data/api-data/api-path-data.json';
import restfulApiData from '../../data/api-data/restful-booker-api-module.json';

/**
test("API Testing", async ({ request }) => {

    const bookingIds=await request.get('booking');
    console.log(await bookingIds.json());
    
});
test("API Testing2", async ({ request }) => {

    const bookingDetails =await request.get('booking/49');
    console.log(await bookingDetails.json());
    
});
 */
test("Verify that the user is able to fetch all the booking IDs using GET API and recieve valid response", {
    tag: ['@API'],
    annotation: {
        type: 'Test Case Link',
        description: '// update the link //'
    }
}, async ({ request }) => {

    const bookingIdsResp = await request.get(apiPathData.booking_path);
    const bookingIdsJsonResp = await bookingIdsResp.json();
    console.log(bookingIdsJsonResp);
    expect(bookingIdsResp.status()).toBe(200);
    expect(bookingIdsResp.statusText()).toBe('OK');
    // expect(bookingIdsResp.ok()).toBeTruthy();
    expect(bookingIdsJsonResp).not.toBeNull();
    expect(bookingIdsResp.headers()['content-type']).toBe(restfulApiData['content-type']);
});
test("Verify that the user is able to fetch booking details for a booking id using GET API and recieve valid response", {
    tag: ['@API'],
    annotation: {
        type: 'Test Case Link',
        description: '// update the link //'
    }
}, async ({ request }) => {

    const bookingIdsResp = await request.get(apiPathData.booking_path);
    expect(bookingIdsResp.status()).toBe(200);
    expect(bookingIdsResp.statusText()).toBe('OK');
    const bookingIdsJsonResp = await bookingIdsResp.json();

    // Step 2: Pick first valid ID
    const validBookingId = bookingIdsJsonResp[0]?.bookingid;
    expect(validBookingId).toBeDefined(); // Ensure there's at least one booking

    const bookingDetailsResp = await request.get(`${apiPathData.booking_path}/${validBookingId}`);
    const bookingDetailsJsonResp = await bookingDetailsResp.json();
    console.log(bookingDetailsJsonResp);

    expect(bookingDetailsResp.status()).toBe(200);
    expect(bookingDetailsResp.statusText()).toBe('OK');
    // expect(bookingIdsResp.ok()).toBeTruthy();
    expect(bookingDetailsResp).not.toBeNull();
    expect(bookingDetailsJsonResp).toHaveProperty('firstname');

});
test("Verify that the user is able to create new booking using POST API and recieve valid response", {
    tag: ['@API'],
    annotation: {
        type: 'Test Case Link',
        description: '// update the link //'
    }
}, async ({ request }) => {

    const createBookingResp = await request.post(apiPathData.booking_path, {
        data: restfulApiData.create_booking
    });
    const createBookingJsonResp = await createBookingResp.json();
    console.log(createBookingJsonResp);
    expect(createBookingResp.status()).toBe(200);
    expect(createBookingResp.statusText()).toBe('OK');
    // expect(bookingIdsResp.ok()).toBeTruthy();
    expect(createBookingJsonResp.booking).toMatchObject(restfulApiData.create_booking);
});
test('Verify that the user is able to update existing booking using PUT API and recieve valid response', {
    tag: ['@API'],
    annotation: {
        type: 'Test Case Link',
        description: '// update the link //'
    }
}, async ({ request }) => {

    const bookingIdsResp = await request.get(apiPathData.booking_path);
    const bookingIdsJsonResp = await bookingIdsResp.json();

    const validBookingId = bookingIdsJsonResp[0]?.bookingid;


    const updateBookingResp = await request.put(`${apiPathData.booking_path}/${validBookingId}`, {
        /* headers: {
             Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=]"
         }*/
        data: restfulApiData.update_booking
    });


    const updateBookingJsonResp = await updateBookingResp.json();
    console.log(updateBookingJsonResp);
    expect(updateBookingResp.status()).toBe(200);
    expect(updateBookingResp.statusText()).toBe('OK');
    expect(updateBookingJsonResp.booking).toMatchObject(restfulApiData.update_booking);

});