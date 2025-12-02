import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  members: string[];
  orientador: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  private projects: Project[] = [
    {
      id: 1,
      title: 'Labirinto cerebral: entendendo o cérebro e as doenças psiquiátricas',
      description: 'O projeto “Labirinto cerebral: entendendo o cérebro e as doenças psiquiátricas” tem como objetivo estudar o funcionamento do cérebro, compreender como surgem alguns transtornos que afetam emoções, pensamentos e comportamentos e analisar como os tratamentos evoluíram ao longo do tempo, incluindo práticas antigas como a lobotomia. Durante a pesquisa, os estudantes já produziram desenhos das estruturas do cérebro e estudaram suas funções utilizando o modelo anatômico disponível no laboratório de ciências da escola, o que permitiu uma visualização mais clara e detalhada. O trabalho também busca esclarecer dúvidas, reduzir preconceitos sobre doenças psiquiátricas e tornar o conhecimento acessível a outros estudantes.',
      image: 'assets/imgCard.png',
      category: ['Ciências Humanas'],
      members: ['Breno do Carmo Oliveira', 'Miguel Elohim dos Santos Nascimento', 'Stephany Bonfim Santos'],
      orientador: 'Professora Vanessa Felisberto de Oliveira',
      tags: ['Neuroanatomia', 'Saúde Mental']
    },


    {
      id: 2,
      title: 'Projeto Arm – Protótipo de mão robótica para auxiliar pessoas com Parkinson',
      description: 'O presente trabalho apresenta o “Projeto Arm”, desenvolvido por estudantes do 7º ano com o objetivo de criar um protótipo de mão robótica simples e de baixo custo para auxiliar pessoas com doença de Parkinson. Os estudantes iniciaram o projeto pesquisando situações reais enfrentadas por pessoas que têm dificuldades motoras e identificaram o Parkinson como uma condição que provoca tremores, rigidez muscular e dificuldade de controlar movimentos do corpo. A partir dessas informações, estudaram o funcionamento da mão humana e exploraram conceitos básicos de robótica, buscando compreender como mecanismos podem imitar movimentos naturais.',
      image: 'assets/imgCard.png',
      category: ['Engenharia'],
      members: ['Maria Eduarda Nascimento de Jesus', 'Rebeca Vitória Costa Lopes', 'Marcos Evangelista das Neves Neto', 'Isadora Carvalho de Jesus'],
      orientador: 'Professora Vanessa Felisberto de Oliveira',
      tags: ['Tecnologia Assistiva', 'Robótica Educacional']
    },


    {
      id: 3,
      title: 'Do litoral à mesa: impactos da poluição marinha na vida humana e animal',
      description: 'A degradação ambiental tem causado impactos significativos nos ecossistemas marinhos, tornando a problemática da poluição litorânea, especialmente no contexto de Salvador (Bahia), um tema urgente a ser discutido e pesquisado. A presente pesquisa tem como questão-problema: é possível utilizar um jogo como ferramenta educativa para conscientizar adolescentes e jovens sobre os danos da poluição marinha? O objetivo geral é desenvolver e aplicar um jogo educativo como ferramenta de conscientização para adolescentes e jovens sobre os impactos da poluição marinha, destacando os efeitos dos resíduos sólidos, especialmente plásticos e embalagens descartáveis presentes nas praias de Salvador, na biodiversidade marinha, na saúde humana e no equilíbrio dos ecossistemas.',
      image: 'assets/imgCard.png',
      category: ['Ciências da Natureza'],
      members: ['Isabela Silva Costa de Souza', 'Melissa Reis Bueno'],
      orientador: 'Professora Vanessa Felisberto de Oliveira',
      tags: ['mecânica', 'Biologia']
    },


    {
      id: 4,
      title: 'Entre fibras e formas: padrões e geometria das tranças afro-brasileiras',
      description: 'Este projeto investiga os padrões matemáticos presentes nas tranças afro-brasileiras e sua aplicação no ensino da matemática. A partir da etnomatemática (D’Ambrosio, 2005), busca-se valorizar saberes culturais afro-brasileiros e promover práticas pedagógicas mais inclusivas. O estudo combina pesquisa teórica (artigos, livros e referências sobre etnomatemática e tranças) e prática (confecção de tranças com fibras sintéticas), analisando simetrias, tesselações e sequências numéricas. Espera-se desenvolver atividades didáticas que aproximem os conteúdos escolares da realidade dos estudantes, despertando maior interesse pela disciplina e promovendo representatividade cultural.', 
      image: 'assets/imgCard.png',
      category: ['Matemática'],
      members: ['Ágatha Victória Bonfim da Rocha', 'Damilly da Silva Santos'],
      orientador: 'Professora Vanessa Felisberto de Oliveira',
      tags: ['Etnomatemática', 'Geometria', 'Cultura Afro-brasileira']
    },


    {
      id: 5,
      title: 'Protótipo de escola do futuro: inclusiva e tecnológica',
      description: 'O presente projeto tem como objetivo desenvolver um modelo de escola bilíngue inclusiva e tecnológica, que promova acessibilidade comunicacional e autonomia para estudantes surdos no contexto da educação básica. Considerando os desafios enfrentados por esses alunos, como a falta de intérpretes, ausência de professores fluentes em Libras e limitações no acesso a materiais didáticos acessíveis, propõe-se a utilização de tecnologias inovadoras e recursos pedagógicos digitais. A metodologia empregada será o design thinking, visando identificar as demandas reais dos estudantes e construir soluções funcionais. Espera-se que o modelo desenvolvido contribua para ampliar o acesso, a permanência e a participação qualificada dos estudantes surdos, promovendo equidade, inclusão e melhoria no processo de ensino-aprendizagem.',
      image: 'assets/imgCard.png',
      category: ['Ciências Humanas', ' Tecnologia'],
      members: ['Cauã Souza de Oliveira', 'Thalita Moreira dos Santos', 'Luane Ferreira dos Santos'],
      orientador: 'Professora Vanessa Felisberto de Oliveira',

      tags: ['Educação Inclusiva', 'Tecnologia Assistiva']
    },
    {
      id: 6,
      title: 'Diário audiovisual do clube de ciências: documentário maker',
      description: 'Este projeto propõe a produção de um mini documentário colaborativo no âmbito do Clube de Ciências, no qual o grupo retratará o desenvolvimento dos projetos científicos em andamento. A proposta inclui também a criação de um suporte tecnológico com microcontrolador, que permitirá acionar cortes e vídeos por meio de QR Codes, garantindo acessibilidade, interatividade e inovação na forma de registro e divulgação científica. O projeto busca não apenas documentar o processo de pesquisa e criação, mas também fortalecer a cultura maker, a integração de tecnologias digitais e a valorização da trajetória dos estudantes como protagonistas de sua aprendizagem. Espera-se que os resultados ampliem o impacto do Clube de Ciências dentro e fora da escola, consolidando-o como espaço de formação científica, crítica e criativa.',

      image: 'assets/imgCard.png',
      category: ['Ciências Humanas'],
      members: ['Rafael Santana de Jesus', 'Charles Rafael de Matos Santana'],
      orientador: 'Professora Vanessa Felisberto de Oliveira',

      tags: ['Educação', 'Comunicação', 'Tecnologias Digitais'],
    },
    {
      id: 7,
      title: 'Laboratório Maker',
      description: '',
      image: 'assets/imgCard.png',
      category: ['Engenharia'],
      members: [''],
      orientador: '',
      tags: ['Em breve...'],
    },


  ];

  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }

  getFeaturedProjects(): Project[] {
    return this.projects.slice(0, 4); 
  }
}


