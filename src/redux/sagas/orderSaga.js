import axios from 'axios';
import { takeLatest, put, delay } from 'redux-saga/effects';
import { dispatches } from '../../VariableTitles/VariableTitles';

function* submitCheckIn(action) {
  try {
    yield put({ type: 'CLEAR_ORDER_PLACEMENT_ERROR' });
    yield put({ type: 'CLEAR_STAFF_UNABLE_TO_PLACE_ORDER_ERROR' });
    yield axios.post('/api/order', action.payload);
    yield put({ type: dispatches.staff.setSuccessfullySubmittedManualClientOrder });
    yield delay(10 * 1000);
    yield put({ type: dispatches.staff.clearSuccessfullySubmittedManualClientOrder });
  } catch (error) {
    yield put({ type: 'SET_ORDER_PLACEMENT_ERROR' });
    yield put({ type: 'SET_STAFF_UNABLE_TO_PLACE_ORDER_ERROR' });
    // Pause for 30 seconds before automatically dismissing the error.
    yield delay(30 * 1000);
    yield put({ type: 'CLEAR_STAFF_UNABLE_TO_PLACE_ORDER_ERROR' });
    console.log('User get request failed', error);
  }
}

// will be fired on "FETCH_WAIT_TIME" actions
function* fetchWaitTime() {
  try {
    // This is the string of the wait minutes to return. Since the return value from the
    // get request isn't saved outside of the while loop change this value by setting it here first.
    let returnStr = '';
    // Boolean to prevent from infinitely requesting.
    let processing = true;
    // Loop a get request for the estimated wait minutes until the minutes have been
    // specified by a volunteer/admin because the user was checked in.
    while (processing === true) {
      // Pause for 5 seconds before looping again.
      yield delay(5 * 1000);
      const response = yield axios.get('/api/order/client-order-status');
      // The get finds orders for today's date so keep looping
      // to give the order a moment to go through.
      if (response.data[0]) {
        // If the estimated wait time minutes have been specified break the loop and return that value.
        if (response.data[0].checkout_at !== null) {
          if (!response.data[0].wait_time_minutes) {
            yield put({ type: 'SET_ORDER_DECLINED_ERROR' });
          } else {
            returnStr = response.data[0].wait_time_minutes;
          }
          processing = false;
        }
      }
    }
    yield put({ type: 'SET_WAIT_TIME', payload: returnStr });
  } catch (error) {
    yield put({ type: 'SET_RETRIEVE_ACTIVE_ORDER_ERROR' });
    console.log('User order get request failed', error);
  }
}

function* accountSaga() {
  yield takeLatest('SUBMIT_ORDER', submitCheckIn);
  yield takeLatest('FETCH_WAIT_TIME', fetchWaitTime);
}

export default accountSaga;
