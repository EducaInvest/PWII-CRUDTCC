import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto } from 'src/app/model/IProduto.model';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-atualizar-produto',
  templateUrl: './atualizar-produto.component.html',
  styleUrls: ['./atualizar-produto.component.css']
})

export class AtualizarProdutoComponent implements OnInit {

  produto: IProduto = {
    nomeProjeto: '',
    publicacao: new Date(),
    nomeAutor: ''
  };

  constructor(private produtosServices: ProdutosService, private router: Router, private activateRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = Number(this.activateRouter.snapshot.paramMap.get('id'));
    this.produtosServices.buscarPorId(id).subscribe(retorno => {
      this.produto = retorno;
    });
  }

  salvarProduto(): void {
    this.produtosServices.atualizar(this.produto).subscribe(retorno => {
      this.produto = retorno;
      this.produtosServices.exibirMensagem(
        'Sistem',
        `${this.produto.nomeProjeto} foi atualizado com sucesso!`, 'toast-success'
      );
      this.router.navigate(['/produtos']);
    });
  }

}
