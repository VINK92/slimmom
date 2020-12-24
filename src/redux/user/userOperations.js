import userActions from './userActions';

import api from '../../services/backend.service';

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { accessToken },
  } = getState();

  if (!accessToken) return;

  api.setToken(accessToken);

  dispatch(userActions.getCurrentUserRequest());

  api
    .getCurrentUser()
    .then(({ data }) => {
      const { username, id, userData } = data;
      const userInfo = { username, id, userData };
      dispatch(userActions.getCurrentUserSuccess(userInfo));
    })
    .catch(err => dispatch(userActions.getCurrentUserError(err)));
};

const getDailyRate = (userCharacteristics, userId) => dispatch => {
  //   const token =
  //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUxZGNiODVjMmJhNzAwMDQ0NDA5NjUiLCJzaWQiOiI1ZmUxZjdmNTVjMmJhNzAwMDQ0NDA5NmUiLCJpYXQiOjE2MDg2NDQ1OTcsImV4cCI6MTYwODY0ODE5N30.mynRviNExi5wDgG9Mhxc-mNUEw-0FNycFKYL1LoNiJs'; // надо поменять логику, пока захардкодили

  //   const id = '5fcffaa7f7ae5300043515a6'; // надо поменять логику, пока захардкодили
  //   api.setToken(token);
  dispatch(userActions.getCurrentUserRequest());

  api.getDailyRate(userCharacteristics, userId).then(({ data }) => {
    
    if (userId) {
      console.log('with userId ===>', data);
      const { summaries } = data;
      const daySummary = {} 
      return dispatch(userActions.getDailyRateSuccess(data));
    }

    console.log('without userId ===>', data);
    return dispatch(userActions.getDailyRateSuccess(data));
  });
};

const deleteEatenProduct = product => dispatch => {
  dispatch(userActions.deleteEatenProductRequest());
  console.log(product);
  api
    .deleteEatenProduct(product)
    .then(({ data }) => {
      console.log(data);
      return dispatch(
        userActions.deleteEatenProductSuccess(data.newDaySummary),
      );
    })
    .catch(err => dispatch(userActions.deleteEatenProductError(err)));
};

const addProduct = product => dispatch => {
  dispatch(userActions.addProductRequest());

  api
    .addProduct(product)
    .then(({ data }) => dispatch(userActions.addProductSuccess(data.day)))
    .catch(err => dispatch(userActions.addProductError(err)));
};

// {
//   "date": "2020-12-31",
//   "productId": "5d51694802b2373622ff552c",
//   "weight": 100
// }

const getProducts = date => (dispatch, getState) => {
  const {
    auth: { accessToken },
  } = getState();

  if (!accessToken) return;

  api.setToken(accessToken);

  dispatch(userActions.getProductsRequest());

  api
    .getProducts(date)
    .then(({ data }) => {
      console.log(data);
      let payload = {};
      if (data.daySummary) {
        const { daySummary, eatenProducts, id } = data;
        payload = { daySummary, eatenProducts, currentDayId: id };
      } else {
        payload.daySummary = { ...data };
      }
      dispatch(userActions.getProductsSuccess(payload));
    })
    .catch(err => dispatch(userActions.getProductsError(err)));
};

export {
  getCurrentUser,
  getDailyRate,
  addProduct,
  deleteEatenProduct,
  getProducts,
};

// dailyRate: 1351.5
// kcalConsumed: 0
// kcalLeft: 1351.5
// percentsOfDailyRate: 0
