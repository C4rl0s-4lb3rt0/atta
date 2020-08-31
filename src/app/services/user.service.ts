import { Injectable } from '@angular/core';
// import { User } from '../dashboard/dashboard.component';
import { AuthApiService } from '../services/auth-api.service';
@Injectable()

export class UsersService {

  private varAux = this.apiRQ.getUsers().subscribe(resp => {
    console.log('*******************');
    console.log(resp);
    this.user=resp;
    console.log('*******************');
  });
     private user: User[] =  [
          {
            id: '1',
            name: 'Leanne edo edo',
            username: 'aaBret',
            email: 'Sincere@april.biz',
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            status: 'Active',
            level: '2'
          },
          {
            id: '2',
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'Shanna@melissa.tv',
            phone: '010-692-6593 x09125',
            website: 'anastasia.net',
            status: 'Blocked',
            level: '1'
          },
          {
            id: '3',
            name: 'Clementine Bauch',
            username: 'Samantha',
            email: 'Nathan@yesenia.net',
            phone: '1-463-123-4447',
            website: 'ramiro.info',
            status: 'Blocked',
            level: '3'
          },
          {
            id: '4',
            name: 'Patricia Lebsack',
            username: 'Karianne',
            email: 'Julianne.OConner@kory.org',
            phone: '493-170-9623 x156',
            website: 'kale.biz',
            status: 'Active',
            level: '1'
          },
          {
            id: '5',
            name: 'Chelsey Dietrich',
            username: 'Kamren',
            email: 'Lucio_Hettinger@annie.ca',
            phone: '(254)954-1289',
            website: 'demarco.info',
            status: 'Active',
            level: '3'
          },

     ];

     private userBlacklist: User[] = [
      {
        id: '423',
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        status: 'Active',
        level: '1'
      },
      {
        id: '223',
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        status: 'Blocked',
        level: '3'
      },
      {
        id: '312',
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        status: 'Blocked',
        level: '1'
      },
      {
        id: '544',
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        status: 'Active',
        level: '2'
      },
      {
        id: '695',
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        phone: '(254)954-1289',
        website: 'demarco.info',
        status: 'Active',
        level: '3'
      },
      {
        id: '876',
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        phone: '1-477-935-8478 x6430',
        website: 'ola.org',
        status: 'In-Active',
        level: '2'
      },
      {
        id: '547',
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        phone: '210.067.6132',
        website: 'elvis.io',
        status: 'Active',
        level: '1'
      },
      {
        id: '458',
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        phone: '586.493.6943 x140',
        website: 'jacynthe.com',
        status: 'In-Active',
        level: '3'
      },

      {
        id: '453',
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        phone: '024-648-3804',
        website: 'ambrose.net',
        status: 'Active',
        level: '1'
      },

 ];
    //  private recluterId={'1232','3224','2354','2432','1276'}
     private status = [
       {name: 'NO CONTACT'}, {name: 'EMAIL SENT'}, {name: 'FOLLOW UP'}, {name: 'WAITING RESPONSE'}, {name: 'NO RESPONSE'}, {name: 'SCREENING TO DO'}, {name: 'SCREENING PROCESS'}, {name: 'SCREENING DONE'}, {name: 'NO PROFILE'}, {name: 'PAYLOCITY'}, {name: 'WHATSAPP'}];


    //  private status:string[]=["Saab", "Volvo", "BMW"];
    //  private contact=[{'EMAIL','WHATSAPP','FOLLOW UP EMAIL'}]
    //  private blacklist=[{'MOVE TO BLACKLIST','MOVE TO JOB APPLICANTS'}]
  private api: AuthApiService;

     constructor(private apiRQ:AuthApiService) {
       this.api=apiRQ
          console.log('servico listo para usarse');
          console.log('con el auth service creado');
          const varAux = this.apiRQ.getUsers().subscribe(resp => {
            console.log('*******************');
            console.log(resp);
            this.user=resp;
            console.log('*******************');
          });
       this.getUsers();





          this.getUser('1');

     }


     getUsers() {

       const varAux = this.apiRQ.getUsers().subscribe(resp => {
         console.log('*******************');
         console.log(resp);
         this.user=resp;
         console.log('*******************');
       });


       return this.user;
     }
     getBlacklist() {
          return this.userBlacklist;
     }
     getUser(idUser: string) {
          const aux = this.user.find(x => x.id === idUser);
          return aux;
     }
     getStatus() {
       return this.status;
     }
    //  getRecluterId(){
    //    return this.recluterId
    //  }
    //  getContact(){
    //    return this.contact
    //  }

    //  getBlacklist(){
    //    return this.blacklist
    //  }

}

export interface User {
     id: string;
     name: string;
     username: string;
     email: string;
     phone: string;
     website: string;
     status: string;
     level: string;
   }
