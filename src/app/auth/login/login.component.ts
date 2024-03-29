import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

// Google API
declare const gapi: any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({    
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    //console.log('submit');
    //this.router.navigateByUrl('/');

    //console.log( this.loginForm.value );

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        //console.log(resp);

        if ( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
/*
  onSuccess( googleUser ) {

    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error) {
    console.log(error);
  }
*/
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',/*
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure*/
    });

    this.startApp();
  }

  async startApp() {
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '433899414544-vpc85rfdetsokjd0h3tfshpmtacdmds5.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     //scope: 'additional_scope'
    //   });
    //   this.attachSignin( document.getElementById('my-signin2') );
    // });

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        googleUser => {
          // document.getElementById('name').innerText = "Signed in: " +
          //     googleUser.getBasicProfile().getName();
          var id_token = googleUser.getAuthResponse().id_token;
          //console.log(id_token);
          this.usuarioService.loginGoogle( id_token )
            .subscribe( resp => {
              // Navegar al dashboard
              this.ngZone.run(() => {
                this.router.navigateByUrl('/');
              });
              
            });
          
        }, error => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
