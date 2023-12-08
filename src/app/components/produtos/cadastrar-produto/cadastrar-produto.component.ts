import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProduto } from 'src/app/model/IProduto.model';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})

export class CadastrarProdutoComponent implements OnInit {

  produto: IProduto = {
    nomeProjeto:'',
    publicacao: new Date(),
    nomeAutor: ''
  };

  constructor(private produtosServices:ProdutosService, private router: Router) {

   }

  ngOnInit(): void {}

  salvarProduto(): void {
    this.produtosServices.cadastrar(this.produto).subscribe(retorno => {
      this.produto = retorno;
      this.produtosServices.exibirMensagem(
        'Sistem',
        `${this.produto.nomeProjeto} foi cadastrado com sucesso. ID: ${this.produto.id}`, 'toast-success'
      );
      this.router.navigate(['/produtos']);
    });
  }
}
