import axios from 'axios';




export const createForage = (forage) => async (dispatch) => {
    dispatch({ type: 'FORAGE_CREATE_REQUEST' });
    try {
      const response = await axios.post('https://apisurvserver.onrender.com/api/forage/create', forage);
      dispatch({ type: 'FORAGE_CREATE_SUCCESS' });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erreur lors de la création du fourrage';
      dispatch({ type: 'FORAGE_CREATE_FAILED', payload: errorMessage });
    }
  };
  



export const getAllForages = () => async dispatch => {
    dispatch({ type: 'GET_FORAGES_REQUEST' })
    try {
        const response = await axios.get('https://apisurvserver.onrender.com/api/forage/getAllForages')
        console.log(response);
        dispatch({ type: 'GET_FORAGES_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_FORAGES_FAILED', payload: error })
        

    }

}

export const getForageById = (forageId) => async dispatch => {
    dispatch({ type: 'GET_FORAGEBYID_REQUEST' })

    try {
        const response = await axios.get(`https://apisurvserver.onrender.com/api/forage/getForageById/${forageId}`);
        dispatch({ type: 'GET_FORAGEBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_FORAGEBYID_FAILED', payload: error })
    }
}


export const editForage = (editedForage) => async (dispatch) => {
    dispatch({ type: 'EDIT_FORAGE_REQUEST' });
    try {
        const response = await axios.post('https://apisurvserver.onrender.com/api/forage/editForage', editedForage);
        console.log(response);
        dispatch({ type: 'EDIT_FORAGE_SUCCESS' });
        window.location.href = '/admin/forages'
    } catch (error) {
         const errorMessage = error.response?.data?.message || "Erreur lors de la modification de fourrage";
        dispatch({ type: 'EDIT_FORAGE_FAILED', payload: errorMessage });
     }
};


export const deleteForage = (forageId) => async dispatch => {
    try {
        const response = await axios.post('https://apisurvserver.onrender.com/api/forage/deleteForage', { forageId })
        alert('fourrage supprimé avec succès')
        console.log(response);
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

