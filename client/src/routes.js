import FrontLayout from "@/hoc/FrontLayout";
import About from "@/containers/About";
import Home from "@/containers/Home";
import Cakes from "@/containers/Cakes";
import AdminLayout from "@/hoc/AdminLayout";
import AdmAbout from "@/containers/admin/AdmAbout";
import AdmCakeCategories from "@/containers/admin/AdmCakeCategories";
import AdmCakeCategory from "@/containers/admin/AdmCakeCategory";
import AdmCapCakeCategory from "@/containers/admin/AdmCapCakeCategory";
import AdmEditCake from "@/containers/admin/AdmEditCake";
import AdmEditCapCakeCategory from "@/containers/admin/AdmEditCapCakeCategory";
import AdmEditCakeCategory from "@/containers/admin/AdmEditCakeCategory";
import React from "react";
import {Route, Switch} from "react-router-dom";

const renderWithLayout = (Layout, Component) => {
  const result = (props) => {
    return(
      <Layout props={props}>
        <Component />
      </Layout>
      );

  }
  return result;
}

const personalAccountRoutes = [

];

const frontRoutes = [
  {path: "/", Component: renderWithLayout(FrontLayout, Home), name: 'Домашняя', title: 'Главная'},
  {path: "/about", Component: renderWithLayout(FrontLayout, About), name: 'Обо мне', title: 'Обо мне'},
  {path: "/cakes/:category", Component: renderWithLayout(FrontLayout, Cakes), name: 'Торты', title: 'Торты'},
];

const adminRoutes = [
  {path: "/admin/main", Component: renderWithLayout(AdminLayout, AdmAbout), name: '', title: 'Администрирование'},
  {path: "/admin/cakes/index/:index", Component: renderWithLayout(AdminLayout, AdmCakeCategories), name: 'Торты', title: 'Торты'},
  {path: "/admin/cakes/index/:index/addcategory", Component: renderWithLayout(AdminLayout, AdmEditCakeCategory), name: 'Добавление новой категории', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/index/:index/categories/:category/edit", Component: renderWithLayout(AdminLayout, AdmEditCakeCategory), name: 'Редактирование раздела "Торты/Категория"', title: 'Редактирование раздел "Торты"'},

  {path: "/admin/cakes/index/:index/categories/:category/page/:catcakepage", Component: renderWithLayout(AdminLayout, AdmCakeCategory), name: 'Торт:', title: 'Категория'},
  {path: "/admin/cakes/index/:index/categories/:category/page/:catcakepage/addcake", Component: renderWithLayout(AdminLayout, AdmEditCake), name: 'Добавление торта"', title: 'Редактирование раздел "Торты"'},
  {path: "/admin/cakes/index/:index/categories/:category/page/:catcakepage/edit/:cake", Component: renderWithLayout(AdminLayout, AdmEditCake), name: 'Редактирование торта ', title: 'Редактирование раздел "Торты"'},

  {path: "/admin/capcakes/index/:index", Component: renderWithLayout(AdminLayout, AdmCapCakeCategory), name: 'Капкейки', title: 'Капкейки'},
  {path: "/admin/capcakes/index/:index/addcategory", Component: renderWithLayout(AdminLayout, AdmEditCapCakeCategory), name: 'Добавление новой категории', title: 'Редактирование раздел "Торты"'},
];

const routes = (isAuthenticated)=>{
  if(isAuthenticated){
    return [
      ...frontRoutes,
      ...adminRoutes,
    ]
  }else {
    return [
      ...frontRoutes,
    ]
  }
} ;

export default routes;
