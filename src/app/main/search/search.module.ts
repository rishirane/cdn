import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { SearchService } from './search.service';
import { SearchComponent } from './search.component';
import { SearchClassicComponent } from './tabs/classic/classic.component';
import { SearchTableComponent } from './tabs/table/table.component';


const routes = [
    {
        path     : 'search',
        component: SearchComponent,
        resolve  : {
            search: SearchService
        }
    }
];

@NgModule({
    declarations: [
        SearchComponent,
        SearchClassicComponent,
        SearchTableComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers   : [
        SearchService
    ],
    exports: [
        SearchComponent,
        SearchClassicComponent,
        SearchTableComponent
    ],
})
export class SearchModule
{
}
