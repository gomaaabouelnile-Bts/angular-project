import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { GoodsComponent } from './component/goods/goods.component';
import { AccountComponent } from './component/account/account.component';
import { MenuListComponent } from './component/menu-list/menu-list.component';
import { LoginComponent } from './component/login/login.component';
import { CustomerkindComponent } from './component/Codes/customerkind/customerkind.component';
import { SalesFieldComponent } from './component/codes/sales-field/sales-field.component';
import { CompetitionCompanyComponent } from './component/codes/competition-company/competition-company.component';
import { ProductGroupComponent } from './component/codes/product-group/product-group.component';
import { NoteTypeComponent } from './component/codes/note-type/note-type.component';
import { TerritoryComponent } from './component/codes/territory/territory.component';
import { GovernorateComponent } from './component/codes/governorate/governorate.component';
import { LoginActivate } from './component/login/LoginActivate';
import { UsersComponent } from './component/security/users/users.component';
import { CustomerComponent } from './component/customer/customer/customer.component';
import { GroupsComponent } from './component/security/groups/groups.component';
import { SalesRepComponent } from './component/codes/Sales-Rep/sales-rep/sales-rep.component';
import { LocationComponent } from './location/location.component';
import { GeneralSetUpComponent } from './component/general-set-up/general-set-up.component';
import { WaitingCustomersComponent } from './component/WaitingCustomers/waiting-customers/waiting-customers.component';
import { AgentComponent } from './component/codes/Agent/agent/agent.component';
import { CreateQuestionComponent } from './component/codes/create-question/create-question.component';
import { CustRepComponent } from './component/Reports/CustRep/cust-rep/cust-rep.component';
import { CustClassRepComponent } from './component/Reports/CustomerClassREp/cust-class-rep/cust-class-rep.component';
import { CustSalesFieldRepComponent } from './component/Reports/CustomerSalesFieldRep/cust-sales-field-rep/cust-sales-field-rep.component';
import { CustNoteTypeRepComponent } from './component/Reports/CustomerNoteTypeReport/cust-note-type-rep/cust-note-type-rep.component';
import { CustProcuctGRepComponent } from './component/Reports/CustomerProductGroupREp/cust-procuct-grep/cust-procuct-grep.component';
import { TotalVisitsRepComponent } from './component/Reports/TotalVisits/total-visits-rep/total-visits-rep.component';
import { EvalRepComponent } from './component/Reports/EvaluationRep/eval-rep/eval-rep.component';
import { ComptionComponent } from './Component/Reports/compition/comption/comption.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate:[LoginActivate]
  },
  {path: 'Customers/Customer/Location', component: LocationComponent, canActivate:[LoginActivate]},
  {path: 'Goods', component: GoodsComponent, canActivate:[LoginActivate]},
  {path: 'Account', component: AccountComponent, canActivate:[LoginActivate]},
  {path: 'MenuList/:id', component: MenuListComponent, canActivate:[LoginActivate]},
  {path: 'login', component: LoginComponent},
  {path: 'Codes/CustomerKind', component: CustomerkindComponent, canActivate:[LoginActivate]},
  {path: 'MenuList/:id/Cart', component: GoodsComponent, canActivate:[LoginActivate]},
  {path: 'MenuList/:id/Cart', component: GoodsComponent, canActivate:[LoginActivate]},
  {path: 'Codes/SalesField', component: SalesFieldComponent, canActivate:[LoginActivate]},
  {path: 'Codes/CompetitionCompanies', component: CompetitionCompanyComponent, canActivate:[LoginActivate]},
  {path: 'Codes/ProductGroup', component: ProductGroupComponent, canActivate:[LoginActivate]},
  {path: 'Codes/NoteType', component: NoteTypeComponent, canActivate:[LoginActivate]},
  {path: 'Codes/Territory', component: TerritoryComponent, canActivate:[LoginActivate]},
  {path: 'Codes/SalesRep', component: SalesRepComponent, canActivate:[LoginActivate]},
  {path: 'Codes/Governorate', component: GovernorateComponent, canActivate:[LoginActivate]},
  {path: 'Codes/Agent', component: AgentComponent, canActivate:[LoginActivate]},
  {path: 'Codes/CreateQuestion', component: CreateQuestionComponent, canActivate:[LoginActivate]},
  {path: 'Admin/Users', component: UsersComponent, canActivate:[LoginActivate]},
  {path: 'Customers/Customer', component: CustomerComponent, canActivate:[LoginActivate]},
  {path: 'Admin/Groups', component: GroupsComponent, canActivate:[LoginActivate]},
  {path: 'Admin/GeneralSetUp', component: GeneralSetUpComponent, canActivate:[LoginActivate]},
  {path: 'Reports/CustRep', component: CustRepComponent, canActivate:[LoginActivate]},
  {path: 'Reports/CustClassRep', component: CustClassRepComponent, canActivate:[LoginActivate]},
  
  {path: 'Reports/CustSalesFieldRep', component: CustSalesFieldRepComponent, canActivate:[LoginActivate]},
  
  {path: 'Reports/CustNoteTypeRep', component: CustNoteTypeRepComponent, canActivate:[LoginActivate]},
  
  {path: 'Reports/CustPGRep', component: CustProcuctGRepComponent, canActivate:[LoginActivate]},
  
  {path: 'Reports/totalVisitsRep', component: TotalVisitsRepComponent, canActivate:[LoginActivate]},
  
  {path: 'Reports/EvalRep', component: EvalRepComponent, canActivate:[LoginActivate]},
  
  {path: 'Reports/compition', component: ComptionComponent, canActivate:[LoginActivate]},
  {path: 'Admin/WaitingCust', component: WaitingCustomersComponent, canActivate:[LoginActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
