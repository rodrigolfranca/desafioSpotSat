# desafioSpotSat
<br>

## Proposta

Nesta parte você deve implementar um CRUD completo para lugares (nome + ponto) e áreas (nome + polígono) que deverão ser persistidos em um banco PostgreSQL com a extensão PostGIS. Você deve utilizar o formato GeoJSON e pode usar o site [https://geojson.io/](https://geojson.io/) para gerar e visualizar os polígonos. Além das rotas com operações de listagem, criação, visualização, atualização, e remoção você  deve incluir rotas para pesquisar lugares e áreas dentro de um círculo, calcular a distância entre dois lugares (usando a projeção adequada), verificar se um lugar está dentro de uma área e uma última rota para listar lugares dentro de uma área. As rotas devem ser autenticadas usando JWT mas não é necessário criar rotas para criar usuários, recuperação de senhas e outros relacionados apenas deixar um usuário administrador cadastrado no banco de dados e suas credenciais no readme do projeto.


## Pra rodar
<br>

## database

Pra montar o banco de dados existem duas opções:

1 - Instala postgresql e postgis, dentro do postgresql cria uma database com o nome "SpotSat_Challenge" e roda o arquivo 'init.sql' que esta na pasta /database/

2 - Usa o Dockerfile que ta na pasta database pra criar uma imagem e um container com o Docker:

```bash
docker build -t spotsatdb .
```
e

```bash
docker run --name spotsatdbcontainer -p 5432:5432 -d spotsatdb
```
<br>

## API

```bash
npm install
npm start
```
Na raiz do projeto.
<br>
# Rotas

Base URL: 'http://localhost:3000/

## Rotas Usuário
<br>

POST ('/users/login')

    Rota para login de usuário admin
        body:
            {
                "email": "admin@admin.com"
                "password": "123456"
            }
        response:
            200:            
            {
                "message": "Logged in"
            }
            cookies:
                session = JWT do usuário

<BR>

## Rotas Lugares 

### paths:

 GET ('points/')
    
    Retorna uma lista de todos os pontos cadastrados
        cookies:
            session: JWT do usuário
        response: 
            '200':
            [
                {
                    "geojson": {
                        "type": "FeatureCollection",
                        "features": [
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        -46.635940857,
                                        -23.52953673
                                    ]
                                },
                                "properties": {
                                    "id": 1,
                                    "name": "exemplo"
                                }
                            },
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        -46.655210929,
                                        -23.559051655
                                    ]
                                },
                                "properties": {
                                    "id": 2,
                                    "name": "exemplo 2"
                                }
                            }
                        ]
                    }
                }
            ]


GET ('points/:id')

    Retorna os detalhes de um ponto específico
        parameters:
            - id : ID do ponto
        cookies:
            session: JWT do usuário
        responses:
            '200':
            {
                "geojson": {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -46.635940857,
                                    -23.52953673
                                ]
                            },
                            "properties": {
                                "name": "exemplo"
                            }
                        }
                    ]
                }
            }


            
 
 
 
POST ('points/create')

    Cria um novo ponto com as informações fornecidas
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "geojson" : {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "exemplo 1"
                    },
                    "geometry": {
                        "coordinates": [
                        -46.65521092856963,
                        -23.559051655189023
                        ],
                        "type": "Point"
                    }
                }
            ]
            }
        }
    
    reponse:
    '201':
        {
            "id": 1
        }

POST ('points/update/')
    
    Atualiza as informações de um ponto existente
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "id": 2,
            "geojson" : {
            "type": "FeatureCollection",
            "features": [
                {
                "type": "Feature",
                "properties": {
                    "name": "Praça da Sé rs"
                },
                "geometry": {
                    "coordinates": [
                    -46.633349905098385,
                    -23.550713258921476
                    ],
                    "type": "Point"
                }
                }
            ]
            }
        }
    responses:
    '200':
        {
            "id": 1
        }



DELETE ('points/delete')

    Exclui um ponto existente com base no ID fornecido
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "id": 2
        }
    responses:
        '204':
          description: No Content



POST ('points/distance')

    Retorna a distancia em metros de dois lugares dados os seus IDs
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "id1": 2,
            "id2": 3
        }
    responses:
        '200':
        {
            "distance_in_meters": 210.341223
        }



POST ('points/isin')

    Verifica se um ponto está dentro de uma área definida por uma coleção de polígonos
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "idPoint": 2,
            "idPolygon": 1
        }
    responses:
        '200':
        {
            "message": "is in"
        }



## Rotas Áreas 

### paths:

GET ('polygon/')

    Retorna uma lista de todos as áreas cadastradas
        cookies:
            session: JWT do usuário
        response: 
            '200':
            [
                {
                    "geojson": {
                        "type": "FeatureCollection",
                        "features": [
                            {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": [
                                        [
                                            [
                                                0.749059193,
                                                1.073535591
                                            ],
                                            [
                                                0.948801357,
                                                0.60605383
                                            ],
                                            [
                                                1.530558439,
                                                1.157479997
                                            ],
                                            [
                                                0.749059193,
                                                1.073535591
                                            ]
                                        ]
                                    ]
                                },
                                "properties": {
                                    "id": 1,
                                    "name": "Testando circle"
                                }
                            },
                        {
                            "type": "Feature",
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": [
                                        [
                                            [
                                                -47.083677726,
                                                -23.513726133
                                            ],
                                            [
                                                -46.622251945,
                                                -23.926112488
                                            ],
                                            [
                                                -46.204771476,
                                                -23.543944883
                                            ],
                                            [
                                                -46.545347648,
                                                -23.201060813
                                            ],
                                            [
                                                -47.083677726,
                                                -23.513726133
                                            ]
                                        ]
                                    ]
                                },
                                "properties": {
                                    "id": 3,
                                    "name": "Exemplo"
                                }
                            }
                        ]
                    }
                }
            ]


GET ('polygons/:id')

    Retorna os detalhes de uma área específica
        parameters:
            - id : ID da área
        cookies:
            session: JWT do usuário
        responses:
            '200':
            {
                "geojson": {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [
                                    [
                                        [
                                            0.749059193,
                                            1.073535591
                                        ],
                                        [
                                            0.948801357,
                                            0.60605383
                                        ],
                                        [
                                            1.530558439,
                                            1.157479997
                                        ],
                                        [
                                            0.749059193,
                                            1.073535591
                                        ]
                                    ]
                                ]
                            },
                            "properties": {
                                "name": "Testando circle"
                            }
                        }
                    ]
                }
            }
 
POST ('polygons/create')

    Cria uma nova área com as informações fornecidas
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "geojson": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "criando area"
                        },
                        "geometry": {
                            "coordinates": [
                            [
                                [
                                0.7490591928125525,
                                1.073535591373357
                                ],
                                [
                                0.9488013566153484,
                                0.60605383046898
                                ],
                                [
                                1.5305584391823572,
                                1.1574799968734482
                                ],
                                [
                                0.7490591928125525,
                                1.073535591373357
                                ]
                            ]
                            ],
                            "type": "Polygon"
                        }
                    }
                ]
            }
        }
    
    reponse:
    '201':
        {
            "id": 1
        }

POST ('polygons/update/')
    
    Atualiza as informações de um ponto existente
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "id": 5,
            "geojson": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [
                                        -43.207689168,
                                        -22.898124919
                                    ],
                                    [
                                        -48.235994114,
                                        -18.911242223
                                    ],
                                    [
                                        -41.954803118,
                                        -18.908923356
                                    ],
                                    [
                                        -39.038887422,
                                        -12.277084034
                                    ],
                                    [
                                        -65.316786066,
                                        -19.055201604
                                    ],
                                    [
                                        -43.207689168,
                                        -22.898124919
                                    ]
                                ]
                            ]
                        },
                        "properties": {
                            "name": "outro nome"
                        }
                    }
                ]
            }
        }
    responses:
    '200':
        {
            "id": 5
        }


DELETE ('polygons/delete')

    Exclui uma área existente com base no ID fornecido
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "id": 5
        }
    responses:
        '204':
          description: No Content

GET ('polygons/search/:id')

    Busca todos os lugares dentro de uma área
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        [
            {
                "geojson": {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -46.655210929,
                                    -23.559051655
                                ]
                            },
                            "properties": {
                                "name": "exemplo 2",
                                "id": 5
                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -46.655210929,
                                    -23.559051655
                                ]
                            },
                            "properties": {
                                "name": "exemplo 2",
                                "id": 6
                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -46.633238273,
                                    -23.554016257
                                ]
                            },
                            "properties": {
                                "name": "teste",
                                "id": 7
                            }
                        }
                    ]
                }
            }
        ]


## Rota Extra

### paths:

POST ('search/circle')

    Retorna áreas e pontos que estejam dentro de um circulo dados sua latitude longuitude e raio
    cookies:
        session: JWT do usuário
    header:
        Content-Type: application/json
    requestBody:
        {
            "lat": 1,
            "lon": 1,
            "radius": 10
        }
    reponse:
        [
            {
                "id": 1,
                "name": "Testando circle",
                "geom": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                0.749059193,
                                1.073535591
                            ],
                            [
                                0.948801357,
                                0.60605383
                            ],
                            [
                                1.530558439,
                                1.157479997
                            ],
                            [
                                0.749059193,
                                1.073535591
                            ]
                        ]
                    ]
                }
            },
            {
                "id": 8,
                "name": "aparece no circle",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        1,
                        1.333
                    ]
                }
            }
        ]



