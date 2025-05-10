import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-econtrada',
  template: `
    <div class="container">
      <div class="pagina-nao-encontrada-container">
        <h1> pagina-nao-econtrada works!</h1>
      </div>
    </div>
  `,
  styles: [
    `
      .container{
       margin: 0px auto;
       padding: 0px;
       width: 100%;
       border: 1px solid #d1d1d1;
       background-color:#fbfafa;
      }
    `,
    `.pagina-nao-encontrada-container {
       display: flex;
       flex-direction: column;
       align-items: center;
       border: 1px solid #d1d1d1;
       border-radius: 4px;
       margin: 10px;
       background-color: #ffff;
    }`,
    `.pagina-nao-encontrada-container h1 {
       padding: 10px;
    }`
  ]
})
export class PaginaNaoEcontradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
