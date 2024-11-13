import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { MainSectionComponent } from "./components/main-section/main-section.component";
import { CapitalizePipe } from "./pipes/capitalize-case.pipe";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from "primeng/api";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    imports: [
        BreadcrumbModule,
        TableModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ProgressSpinnerModule,
        DividerModule,
        DialogModule,
        ToastModule,
        InputSwitchModule,
        CommonModule,
        ConfirmDialogModule,
        FontAwesomeModule 
    ],
    declarations: [
        MainSectionComponent,
        CapitalizePipe
    ],
    exports: [
        BreadcrumbModule,
        TableModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ProgressSpinnerModule,
        DividerModule,
        DialogModule,
        ToastModule,
        CommonModule,
        InputSwitchModule,
        MainSectionComponent,
        CapitalizePipe,
        ConfirmDialogModule,
        FontAwesomeModule
    ],
    providers:[ConfirmationService]
  })
  export class SharedModule {}