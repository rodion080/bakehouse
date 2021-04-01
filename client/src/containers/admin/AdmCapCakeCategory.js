import React, {useEffect} from 'react';
import {useParams, withRouter} from "react-router";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {setCount} from "@/reducers/capcake/admCapCakeCategoriesReducer";
import {NavLink} from "react-router-dom";


const AdmCakeCategories = (props) => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.admCapCakeCategoriesReducer.count);

  function onCountClick(){
    dispatch(setCount(15));
  }

  return (
      <div className="admin__frame">
        <div>
          <br/>
          <button onClick={()=>onCountClick()}>Count</button>
          <br/>
          <br/>
          <div>{count}</div>
        </div>


        <NavLink
          className="green__button"
          to={{
            pathname: '/admin/capcakes/index/'+useParams().index+'/addcategory',
          }}
        >Добавить новую категорию</NavLink>




      </div>
  )
}

export default withRouter(AdmCakeCategories);
