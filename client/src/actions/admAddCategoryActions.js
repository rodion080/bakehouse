import axios from 'axios';
import {
  UPLOAD_IMG_INIT, UPLOAD_IMG_SUCCESS, UPLOAD_IMG_ERROR, SET_IMG_NAME,
  SET_IMG_ADDRESS_SUCCESS, UPLOAD_IMG_LOADING, SET_CATEGORY_NAME, SET_MESSAGE,
  SAVE_NEW_CAT_SUCCESS, SAVE_NEW_CAT_ERROR, REMOVE_GARB_FILES_SUCCESS,
} from '../_constants/admAddCategoryConstants';

export function removeGarbageImages() {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/adm/cakes/removegarbageimages', {});
      if (res.data.error) {
        throw res.data.error;
      }
      dispatch(success('', '', ''));
    } catch (e) {
      dispatch(error(e));
    }
  };

  function success(newCategoryName, imgName, imgAddress) {
    return {
      type: REMOVE_GARB_FILES_SUCCESS,
      newCategoryName,
      imgName,
      imgAddress,
    };
  }

  function error(error) {
    return {
      type: SAVE_NEW_CAT_ERROR,
      error,
    };
  }
}

export function saveNewCategory(categoryName, categoryLinkName, imageName, id, serverAddressToSave) {
  return async (dispatch) => {
    try {
      const res = await axios.post(serverAddressToSave,
        {
          categoryName, categoryLinkName, imageName, id,
        });
      if (res.data.error) {
        throw res.data.error;
      }
      dispatch(success('', '', ''));
    } catch (e) {
      dispatch(error(e));
    }
  };

  function success(categoryName, imageName, imageAddress) {
    return {
      type: SAVE_NEW_CAT_SUCCESS,
      categoryName,
      message: 'Данные были успешно сохранены',
      imageName,
      imageAddress,
    };
  }

  function error(error) {
    return {
      type: SAVE_NEW_CAT_ERROR,
      message: error.message ? error.message : '',
      error,
    };
  }
}

export function setMessage(message) {
  return async (dispatch) => {
    dispatch(success(message));
  };

  function success(message) {
    return {
      type: SET_MESSAGE,
      message,
    };
  }
}

export function setCategoryName(categoryName) {
  return (dispatch) => {
    dispatch(success(categoryName));
  };

  function success(categoryName) {
    return {
      type: SET_CATEGORY_NAME,
      categoryName,
    };
  }
}

export function setImageName(imageName) {
  return (dispatch) => {
    dispatch(success(imageName));
  };

  function success(imageName) {
    return {
      type: SET_IMG_NAME,
      imageName,
    };
  }
}

export function setImgAddress(imageAddress) {
  return (dispatch) => {
    dispatch(success(imageAddress));
  };

  function success(imageAddress) {
    return {
      type: SET_IMG_ADDRESS_SUCCESS,
      imageAddress,
    };
  }
}

export function uploadImgAndSetImgAddr(imgAddress, file) {
  return (dispatch) => {
    try {
      dispatch(init(imgAddress));
      const fd = new FormData();
      const fileName = Date.now().toString().substr(9, 4) + file.name;
      fd.append('imageName', file, fileName);
      axios.post('/api/adm/cakes/uploadnewcategoryimage', fd, {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(loading(percentCompleted));
        },
      }).then((res) => {
        dispatch(success(`/public/images/categories/${fileName}`, fileName));
      });
    } catch (e) {
      dispatch(error(e));
    }
  };

  function init(imageAddress) {
    return {
      type: UPLOAD_IMG_INIT,
      loading: true,
      imageAddress,
    };
  }

  function loading(imgUploadPercent) {
    return {
      type: UPLOAD_IMG_LOADING,
      loading: true,
      imgUploadPercent,
    };
  }

  function success(imageAddress, imageName) {
    return {
      type: UPLOAD_IMG_SUCCESS,
      imageAddress,
      imageName,
      loading: false,
    };
  }

  function error(error) {
    return {
      type: UPLOAD_IMG_ERROR,
      error,
      loading: false,
    };
  }
}
