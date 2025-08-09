import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'layout',
        loadComponent: () => import('./core/layout/layout').then(m => m.Layout),
        children: [
            {
                path: 'formbuilder',
                loadComponent: () => import('./dashboard/dynamicformbuilder/dynamicformbuilder').then(m => m.Dynamicformbuilder)
            },
            {
                path: 'wizard',
                loadComponent: () => import('./dashboard/onboarding-wizard/onboarding-wizard').then(m => m.Wizard)
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/employee-table/employee-table').then(m => m.EmployeeTable)
            },
        ]
    },

    {
        path: 'login',
        loadComponent: () => import('./login/login/login').then(m => m.Login)
    },

];
