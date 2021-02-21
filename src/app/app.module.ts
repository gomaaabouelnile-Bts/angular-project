import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MenuListComponent } from './component/menu-list/menu-list.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CustomerkindComponent } from './component/Codes/customerkind/customerkind.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SalesFieldComponent } from './component/codes/sales-field/sales-field.component';
import { CompetitionCompanyComponent } from './component/codes/competition-company/competition-company.component';
import { ProductGroupComponent } from './component/codes/product-group/product-group.component';
import { NoteTypeComponent } from './component/codes/note-type/note-type.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TerritoryComponent } from './component/codes/territory/territory.component';
import { GovernorateComponent } from './component/codes/governorate/governorate.component';
import { LoginActivate } from './component/login/LoginActivate';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UsersComponent } from './component/security/users/users.component';
import { CustomerComponent } from './component/customer/customer/customer.component';
import { GroupsComponent } from './component/security/groups/groups.component';
import { SalesRepComponent } from './component/codes/Sales-Rep/sales-rep/sales-rep.component';
import { AgmCoreModule } from '@agm/core';
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

@NgModule({
  declarations: [
    LocationComponent,
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    NavbarComponent,
    MenuListComponent,
    CartComponent,
    LoginComponent,
    CustomerkindComponent,
    SalesFieldComponent,
    CompetitionCompanyComponent,
    ProductGroupComponent,
    NoteTypeComponent,
    TerritoryComponent,
    GovernorateComponent,
    UsersComponent,
    CustomerComponent,
    GroupsComponent,
    SalesRepComponent,
    GeneralSetUpComponent,
    WaitingCustomersComponent,
    AgentComponent,
    CreateQuestionComponent,
    CustRepComponent,
    CustClassRepComponent,
    CustSalesFieldRepComponent,
    CustNoteTypeRepComponent,
    CustProcuctGRepComponent,
    TotalVisitsRepComponent,
    EvalRepComponent,
    ComptionComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAAKS6uaI_0TWVhhY2ZBkRq5_RGmqMiVOs' }),
    BrowserModule, NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule, CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]), NoopAnimationsModule, ModalModule.forRoot(),
    FormsModule, ReactiveFormsModule, MatToolbarModule, NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LoginActivate, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http);
}
