window.POKER_BLITZ_CARDS = [
  {
    "id": "catalog_v3_001",
    "item": 1,
    "name": "REGLAS ANTIGUAS",
    "type": "Hyper",
    "effect": "Descarta 2 Power Cards de tu mano. \n\nUna vez por turno, durante tu Main Phase, puedes intercambiar una Poker Card con el mazo.\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "Abre una ventana emergente que permite seleccionar 2 Power Cards de tu mano. Mientras esa Hyper esté activa añade en herramientas la capacidad de intercambiar una carta. Una vez por turno. También abre una ventana emergente para elegir la Poker Card de tu mano descartarla y robar una nueva del mazo. A menos que la Hyper sea removida.",
    "asset": "assets/starter_cards/001_reglas_antiguas.jpg"
  },
  {
    "id": "catalog_v3_002",
    "item": 2,
    "name": "INYECCIÓN DE PODER",
    "type": "Hyper",
    "effect": "Descarta 3 Poker Cards y 2 Power Cards. Aumenta tu limitador de robo de Power Cards en +1.\n\nMáximo 1 activa al mismo tiempo.",
    "appBehavior": "Se abre una ventana emergente que permite descartar Poker Cards (3) y Power Cards (2). A partir de ahora el jugador robará 4 Power Cards en vez de 3. A menos que la Hyper sea removida.",
    "asset": "assets/starter_cards/002_inyeccion_de_poder.jpg"
  },
  {
    "id": "catalog_v3_003",
    "item": 3,
    "name": "MANIPULADOR DEL DESTINO",
    "type": "Super",
    "effect": "Al lanzar un dado, suma o resta 1 al número total obtenido.\n\nHasta 2 veces por turno.",
    "appBehavior": "Si el jugador acaba de jugar una carta que tiene que ver con dados, entonces aparece una ventana emergente, después de los Counters  que le permite activar esta carta y aplicar su efecto, ya sea +1 o -1 según prefiera el jugador.",
    "asset": "assets/starter_cards/003_manipulador_del_destino.jpg"
  },
  {
    "id": "catalog_v3_004",
    "item": 4,
    "name": "ESCUDO RESPLANDECIENTE",
    "type": "Counter",
    "effect": "Si un jugador activa un SuperCard, cópialo y juégalo como tuyo.\n\nMáximo 1 activación por jugador por ronda.",
    "appBehavior": "Si el jugador  rival juega una carta que otro jugador puede jugar sin condición previa, es decir puede activarse (es aplicable), entonces el jugador que activa el Counter puede usar el efecto, después de resolver el efecto del otro jugador. Si no es aplicable, entonces no se usa la Counter",
    "asset": "assets/starter_cards/004_escudo_resplandeciente.jpg"
  },
  {
    "id": "catalog_v3_005",
    "item": 5,
    "name": "ARTILUGIO LEGENDARIO",
    "type": "Super",
    "effect": "Si una misma Poker Card está vinculada a Artilugio Amarillo, Verde y Azul obtén 5 fichas.\n\nHasta 2 veces por turno.",
    "appBehavior": "Si el jugador tiene las HyperCards activas en su zona al mismo tiempo y las 3 están vinculadas a la misma carta, entonces se permite activar el efecto.",
    "asset": "assets/starter_cards/005_artilugio_legendario.jpg"
  },
  {
    "id": "catalog_v3_006",
    "item": 6,
    "name": "TIRO POR LA CULATA",
    "type": "Counter",
    "effect": "Si un jugador activa un efecto oblígalo a descartar una Poker Card.\n\nMáximo 2 activación por jugador por ronda.",
    "appBehavior": "Al otro jugador le aparece una ventana emergente de descarte de Poker Cards.",
    "asset": "assets/starter_cards/006_tiro_por_la_culata.jpg"
  },
  {
    "id": "catalog_v3_007",
    "item": 7,
    "name": "ANZUELO DE MEJORAS",
    "type": "Super",
    "effect": "Descarta 2 Poker Cards y 1 Power Card. Busca en tu Deck una Hyper Card de tu preferencia.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de descarte de Poker Cards y Power Cards. Ventana emergente de solo las Hyper Cards restantes en tu Deck.",
    "asset": "assets/starter_cards/007_anzuelo_de_mejoras.jpg"
  },
  {
    "id": "catalog_v3_008",
    "item": 8,
    "name": "DESTELLO RELÁMPAGO",
    "type": "Super",
    "effect": "Activa esta carta si tienes al menos una HyperCard activa. Lanza dados: Si es par descarta una de tus HyperCard, si es impar descarta 2 HyperCard de un jugador seleccionado.\n\nHasta 2 veces por turno.",
    "appBehavior": "Ventana emergente que muestra una pequela animación de lanzar dados y su resultado.",
    "asset": "assets/starter_cards/008_destello_relampago.jpg"
  },
  {
    "id": "catalog_v3_009",
    "item": 9,
    "name": "MAESTRO DE FICHAS",
    "type": "Super",
    "effect": "Selecciona a un jugador. Si tiene 5 o más fichas aplícale uno de estos efectos:\n• Róbale una ficha.\n• Róbale 2 Poker Card al azar.\n• Activa una de sus Power Card al azar como si fuera tuya.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de selección de jugador y el efecto a aplicar. Mostrar ventanas emergentes correspondientes a cada efecto.",
    "asset": "assets/starter_cards/009_maestro_de_fichas_control.jpg"
  },
  {
    "id": "catalog_v3_010",
    "item": 10,
    "name": "OPERACIÓN TÁCTICA",
    "type": "Super",
    "effect": "Selecciona a un jugador. Si tiene 6 o más Poker Card aplícale uno de estos efectos:\n• Intercambia hasta 3 Poker Card al azar con él.\n• Róbale 1 Poker Card al azar.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de selección de jugador y el efecto a aplicar. Mostrar ventanas emergentes correspondientes a cada efecto. Al intercambiar se muestra tu mano vs su mano (la de él está oculta).",
    "asset": "assets/starter_cards/010_operacion_tactica.jpg"
  },
  {
    "id": "catalog_v3_011",
    "item": 11,
    "name": "REABASTECIMIENTO TOTAL",
    "type": "Super",
    "effect": "Todos los jugadores roban una Power Card de sus mazos y una Poker Card adicional.\n\nHasta 3 veces por turno.",
    "appBehavior": "Robo automático. Pequeña animación de que todos roban.",
    "asset": "assets/starter_cards/011_reabastecimiento_total.jpg"
  },
  {
    "id": "catalog_v3_012",
    "item": 12,
    "name": "ESPÍA VS ESPÍA",
    "type": "Super",
    "effect": "Mira la mano completa de un jugador, descarta una de sus cartas. Él hace lo mismo contigo.\n\nHasta 3 veces por turno.",
    "appBehavior": "Ventana emergente respectiva para cada jugador",
    "asset": "assets/starter_cards/012_espia_vs_espia.jpg"
  },
  {
    "id": "catalog_v3_013",
    "item": 13,
    "name": "INTERCAMBIO FORZADO",
    "type": "Super",
    "effect": "Selecciona a un jugador e intercambia hasta 2 Poker Cards con él (a elección de cada uno).\n\nHasta 2 veces por turno.",
    "appBehavior": "Ventana emergente de intercambio.",
    "asset": "assets/starter_cards/013_intercambio_forzado.jpg"
  },
  {
    "id": "catalog_v3_014",
    "item": 14,
    "name": "EXPERTO EN DADOS",
    "type": "Super",
    "effect": "Lanza un dado: 1: Descarta 2 cartas. 2: Descarta 1 carta. 3: Intercambia una carta con el mazo al azar. 4: Roba una carta. 5: Roba 2 cartas. 6: Roba 3 Poker Cards.\n\nHasta 3 veces por turno.",
    "appBehavior": "Ventana emergente de dados y su resultado. Ventana emergente adicional de intercambio cuando corresponda.",
    "asset": "assets/starter_cards/014_experto_en_dados.jpg"
  },
  {
    "id": "catalog_v3_015",
    "item": 15,
    "name": "CICLÓN DE DADOS",
    "type": "Super",
    "effect": "Lanza un dado: Puedes intercambiar Poker Cards con el mazo al azar hasta el número del dado.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de dados y su resultado. Ventna emergente adicional de intercambio.",
    "asset": "assets/starter_cards/015_ciclon_de_dados.jpg"
  },
  {
    "id": "catalog_v3_016",
    "item": 16,
    "name": "OJO DEL MÁS ALLÁ",
    "type": "Super",
    "effect": "Mira las 5 primeras Poker Cards arriba del mazo. Roba una y devuelve el resto en cualquier orden arriba del mazo.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de las 5 primeras cartas de Poker del mazo. Seleccionar una. Permitir reordenar el resto.",
    "asset": "assets/starter_cards/016_ojo_del_mas_alla.jpg"
  },
  {
    "id": "catalog_v3_017",
    "item": 17,
    "name": "ESPEJADOR EXPERTO",
    "type": "Super",
    "effect": "Copia cualquier SuperCard que hayas utilizado durante tu turno.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de Power Cards jugadas (se muestran en plomo si ya no se pueden jugar por límite de activaciones, pero igual se muestran).",
    "asset": "assets/starter_cards/017_espejador_experto.jpg"
  },
  {
    "id": "catalog_v3_018",
    "item": 18,
    "name": "DADOS BONDADOSOS",
    "type": "Super",
    "effect": "Lanza dados: Si es par: Roba hasta 2 PokerCard. Si es impar: Todos roban 1 carta excepto tú.\n\nHasta 3 veces por turno.",
    "appBehavior": "Ventana emergente de animación de dados y su resultado. Animación de robo",
    "asset": "assets/starter_cards/018_dados_bondadosos.jpg"
  },
  {
    "id": "catalog_v3_019",
    "item": 19,
    "name": "DADOS MALICIOSOS",
    "type": "Super",
    "effect": "Lanza dados: Si es par: Descarta 2 Poker Card de la mano. Si es impar: Todos descartan 1 carta excepto tú.\n\nHasta 3 veces por turno.",
    "appBehavior": "Ventana emergente de animación de dados y su resultado. Animación de descarte.",
    "asset": "assets/starter_cards/019_dados_maliciosos.jpg"
  },
  {
    "id": "catalog_v3_020",
    "item": 20,
    "name": "TORMENTA DE CARTAS",
    "type": "Super",
    "effect": "Lanza un dado: Si es par: Todos los jugadores roban una carta del mazo (incluyéndote). Si es impar: Todos intercambian 2 cartas al azar de sus manos en el sentido que tú escojas.\n\nHasta 2 veces por turno.",
    "appBehavior": "Ventana emergente de animación de dados y su resultado. Animación de robo o ventana emergente de dirección de intercambio (horario, antihorario + icono) y luego ventana emergente de intercambio. Primero intercambia el jugador que activó la carta, luego el resto sigue la cadena de intercambio según la dirección definida).",
    "asset": "assets/starter_cards/020_tormenta_de_cartas.jpg"
  },
  {
    "id": "catalog_v3_021",
    "item": 21,
    "name": "PEQUEÑO TORBELLINO",
    "type": "Super",
    "effect": "Todos los jugadores intercambian una Poker Card en el sentido que tú elijas.\n\nHasta 3 veces por turno.",
    "appBehavior": "Ventanas emergentes correspondientes.",
    "asset": "assets/starter_cards/021_pequeno_torbellino.jpg"
  },
  {
    "id": "catalog_v3_022",
    "item": 22,
    "name": "MI COLOR FAVORITO",
    "type": "Super",
    "effect": "Menciona el color de una Poker Card. Roba una carta del mazo. Si es del color que mencionaste roba 1 más. Caso contrario devuelve la que robaste y descarta otra de tu mano.\n\nHasta 3 veces por turno.",
    "appBehavior": "Ventana emergente de color (se refiere a corazón, picas, trebol, diamante). Ventana emergente de carta robada (dura 3 segundos), luego se aplicar el efecto y se abre ventana emergente correspondientes.",
    "asset": "assets/starter_cards/022_mi_color_favorito.jpg"
  },
  {
    "id": "catalog_v3_023",
    "item": 23,
    "name": "NÚMEROS ERRANTES",
    "type": "Super",
    "effect": "Añade una Poker Card de tu mano boca abajo en la mesa. Los demás jugadores deben adivinar el número. Los jugadores que acierten roban una carta del mazo. Si nadie acierta, entonces tú robas 2 del mazo.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente de selección de carta, luego ventana emrgente de solo números para cada jugador (excepto el de turno).",
    "asset": "assets/starter_cards/023_numeros_errantes.jpg"
  },
  {
    "id": "catalog_v3_024",
    "item": 24,
    "name": "ENTENDÍ LA REFERENCIA",
    "type": "Super",
    "effect": "Roba una Poker Card del mazo. Colócalo boca arriba en la mesa. Todos los jugadores excepto tú, deben colocar sus manos en la carta. El último tiene que descartar una carta, y el primero roba la carta.\n\nUna vez por turno.",
    "appBehavior": "Ventana emergente que solo le muestra al jugador de turno la carta robada. Luego ventana emergente de reacción a los demás jugadores. Se cede la ccarta al ganador y el último aparece ventana de descarte.",
    "asset": "assets/starter_cards/024_entendi_la_referencia.jpg"
  },
  {
    "id": "catalog_v3_025",
    "item": 25,
    "name": "ESCUDO DE CARTAS",
    "type": "Hyper",
    "effect": "Descarta 2 Poker Cards. Activa esta carta y colócala frente a ti. Cada vez que alguien te seleccione para un efecto, roba una carta.\n\nMáximo 1 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/025_escudo_de_cartas.jpg"
  },
  {
    "id": "catalog_v3_026",
    "item": 26,
    "name": "COMPARTIR ES GANAR",
    "type": "Super",
    "effect": "Activa uno de los siguientes efectos:\n• Intercambia una Poker Card de tu mano con otro jugador.\n• Roba dos Poker Card del mazo. Selecciona uno y comparte el otro con otro jugador.\n• Hasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/026_compartir_es_ganar.jpg"
  },
  {
    "id": "catalog_v3_027",
    "item": 27,
    "name": "DESPERTAR DEL MÁXIMO PODER",
    "type": "Hyper",
    "effect": "Descarta 2 Power Cards y una ficha. Aumenta tu limitador de Power Cards en +1.\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/027_despertar_del_maximo_poder.jpg"
  },
  {
    "id": "catalog_v3_028",
    "item": 28,
    "name": "LIMITADOR FRAGMENTADO",
    "type": "Hyper",
    "effect": "Descarta 2 Poker Cards. Aumenta tu limitador de Poker Cards en +1.\n\nMáximo 1 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/028_limitador_fragmentado.jpg"
  },
  {
    "id": "catalog_v3_029",
    "item": 29,
    "name": "EL SIMBIONTE",
    "type": "Hyper",
    "effect": "Descarta una Power Card. Selecciona una de tus cartas. Esta carta ahora puede adoptar cualquier valor. Cuando esa carta sea descartada devuelve esta carta al Deck.\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/029_el_simbionte.jpg"
  },
  {
    "id": "catalog_v3_030",
    "item": 30,
    "name": "CAMBIO DE COLOR A ...",
    "type": "Hyper",
    "effect": "Descarta una Power Card. Selecciona una de tus cartas. Esta carta ahora puede adoptar cualquier color. Cuando esa carta sea descartada devuelve esta carta al Deck.\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/030_cambio_de_color.jpg"
  },
  {
    "id": "catalog_v3_031",
    "item": 31,
    "name": "INTERCAMBIO EXPLOSIVO",
    "type": "Super",
    "effect": "Descarta 1 ficha. Roba 1 Poker Card y 1 Power Card.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/031_intercambio_explosivo.jpg"
  },
  {
    "id": "catalog_v3_032",
    "item": 32,
    "name": "DE VUELTA AL JUEGO",
    "type": "Super",
    "effect": "Descarta 1 Power Card. Roba 2 Poker Card.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/032_de_vuelta_al_juego.jpg"
  },
  {
    "id": "catalog_v3_033",
    "item": 33,
    "name": "HE DICHO QUE NO",
    "type": "Counter",
    "effect": "Niega a la activación inmediata de una Power Card.\n\nMáximo 1 activación por jugador por ronda.",
    "appBehavior": "Ventana emergente que solo muestra la carta negada (3 segundos).",
    "asset": "assets/starter_cards/033_he_dicho_que_no.jpg"
  },
  {
    "id": "catalog_v3_034",
    "item": 34,
    "name": "PENALIZACIÓN",
    "type": "Counter",
    "effect": "Si un jugador activa una carta poderosa roba 1 Poker Card del mazo.\n\nMáximo 3 activación por jugador por ronda.",
    "appBehavior": "Robo automático. Animación de robo.",
    "asset": "assets/starter_cards/034_penalizacion.jpg"
  },
  {
    "id": "catalog_v3_035",
    "item": 35,
    "name": "EL JOKER",
    "type": "Hyper",
    "effect": "Descarta 3 Poker Cards. Añade esta carta como un Joker (adopta cualquier valor y color). Cuando esta carta sea descartada devuélvela al Deck.\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "Ventana emergente de descartte. Añade  la Hyper a la Poker Hand.",
    "asset": "assets/starter_cards/035_el_joker.jpg"
  },
  {
    "id": "catalog_v3_036",
    "item": 36,
    "name": "AMANTE DEL AZAR",
    "type": "Super",
    "effect": "Lanza dados: Si suman 7 o ambos son iguales, entonces roba 2 Poker Cards.\n\nHasta 3 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/036_amante_del_azar.jpg"
  },
  {
    "id": "catalog_v3_037",
    "item": 37,
    "name": "CARTA FANTASMA",
    "type": "Super",
    "effect": "Haz que todos los jugadores (excepto tú) roben una Poker Card del mazo. En la siguiente ronda descarta una carta al azar de todos los jugadores.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/037_carta_fantasma.jpg"
  },
  {
    "id": "catalog_v3_038",
    "item": 38,
    "name": "ESPÍA PRINCIPIANTE",
    "type": "Super",
    "effect": "Selecciona a un jugador. Mira hasta 2 Poker Card de su mano al azar.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/038_espia_principiante.jpg"
  },
  {
    "id": "catalog_v3_039",
    "item": 39,
    "name": "SIN REGLAS",
    "type": "Super",
    "effect": "Aumenta tu limitador de Poker Cards de juego a 10 solo por esta ronda.\n\nLuego roba 3 cartas y en tu End Phase descarta 5.\n\nUna vez por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/039_sin_reglas.jpg"
  },
  {
    "id": "catalog_v3_040",
    "item": 40,
    "name": "SABUESO DE ASES",
    "type": "Super",
    "effect": "Busca y roba un As del mazo.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/040_sabueso_de_ases.jpg"
  },
  {
    "id": "catalog_v3_041",
    "item": 41,
    "name": "BLACKJACK",
    "type": "Super",
    "effect": "Por cada par de Poker Cards de distinto valor que sume 21 cóbralo como un par descartándolo y reponiéndolo en tu End Phase.\n\nUna vez por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/041_blackjack.jpg"
  },
  {
    "id": "catalog_v3_042",
    "item": 42,
    "name": "ARTILUGIO AMARILLO",
    "type": "Hyper",
    "effect": "Revela una Poker Card de tu mano a los demás jugadores. Esa carta no es afectada por efectos. Luego, si esa carta forma parte de una combinación adquiere una Power Card adicional en tu próxima Draw Phase (ignora el limitador).\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/042_artilugio_amarillo.jpg"
  },
  {
    "id": "catalog_v3_043",
    "item": 43,
    "name": "ARTILUGIO AZUL",
    "type": "Hyper",
    "effect": "Revela una Poker Card de tu mano a los demás jugadores. Esa carta no es afectada por efectos. Luego, si esa carta forma parte de una combinación adquiere 2 Poker Cards adicional en tu End Phase (atiende al limitador).\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/043_artilugio_azul.jpg"
  },
  {
    "id": "catalog_v3_044",
    "item": 44,
    "name": "ARTILUGIO VERDE",
    "type": "Hyper",
    "effect": "Revela una Poker Card de tu mano a los demás jugadores. Esa carta no es afectada por efectos. Luego, si esa carta forma parte de una combinación adquiere 2 fichas adicional en tu Charge Phase (ignora el limitador).\n\nMáximo 2 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/044_artilugio_verde.jpg"
  },
  {
    "id": "catalog_v3_045",
    "item": 45,
    "name": "ARTIMAÑA DEL AS",
    "type": "Super",
    "effect": "Solo puede usarse teniendo activo “Maldición de los Ases” o descartando una Poker Card y una Power Card.\nCobra una ficha por cada As en tu mano.\n\nUna vez por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/045_artimana_del_as.jpg"
  },
  {
    "id": "catalog_v3_046",
    "item": 46,
    "name": "MALDICIÓN DE LOS ASES",
    "type": "Hyper",
    "effect": "Tu limitador de cartas de juego sube de 7 a 10. Solo puedes cobrar si hay al menos un As en tu combinación, caso contrario vale 0.\n\nMáximo 1 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/046_maldicion_de_los_ases.jpg"
  },
  {
    "id": "catalog_v3_047",
    "item": 47,
    "name": "EL HUESO",
    "type": "Super",
    "effect": "Roba 5 Poker Cards. Luego selecciona a un jugador. Intercambia 2 cartas con él. Si una de tus cartas era un As, oblígalo a descartar dos cartas.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/047_el_hueso.jpg"
  },
  {
    "id": "catalog_v3_048",
    "item": 48,
    "name": "ME LLAMAN ROBIN HOOD",
    "type": "Counter",
    "effect": "Cuando un jugador activa una carta poderosa róbale una ficha.\n\nMáximo 2 activación por jugador por ronda.",
    "appBehavior": "Robo automático. Animación de robo.",
    "asset": "assets/starter_cards/048_me_llaman_robin_hood.jpg"
  },
  {
    "id": "catalog_v3_049",
    "item": 49,
    "name": "GRAN INVERSOR",
    "type": "Hyper",
    "effect": "Descarta 3 Poker Cards y 2 Power Cards.\nObtén una ficha al final de cada ronda.\n\nMáximo 1 activo al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/049_gran_inversor.jpg"
  },
  {
    "id": "catalog_v3_050",
    "item": 50,
    "name": "CASCO ANTI-EFECTOS",
    "type": "Hyper",
    "effect": "Descarta 1 Poker Card y 1 Power Card.\nLa primera vez en cada ronda que seas seleccionado, niega ese efecto.\n\nMáximo 1 activa al mismo tiempo.",
    "appBehavior": "",
    "asset": "assets/starter_cards/050_casco_anti_efectos.jpg"
  },
  {
    "id": "catalog_v3_051",
    "item": 51,
    "name": "EL GRAN TIFÓN",
    "type": "Super",
    "effect": "Selecciona a un jugador. Devuelve a su deck una de sus HyperCard activa.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/051_el_gran_tifon.jpg"
  },
  {
    "id": "catalog_v3_052",
    "item": 52,
    "name": "AGUJERO NEGRO",
    "type": "Counter",
    "effect": "Cuando un jugador active una SuperCard o HyperCard, puedes jugar esta carta. Elige uno de sus Hiperjuegos activos y devuélvelo a su deck.\n\nMáximo 1 activación por jugador por ronda.",
    "appBehavior": "Ventana emergente de selección de Hyper dek jugador al que se le aplicó el efecto.",
    "asset": "assets/starter_cards/052_agujero_negro.jpg"
  },
  {
    "id": "catalog_v3_053",
    "item": 53,
    "name": "PLANO Y SIMPLE",
    "type": "Super",
    "effect": "Roba una Poker Card del mazo.\n\nHasta 2 veces por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/053_plano_y_simple.jpg"
  },
  {
    "id": "catalog_v3_054",
    "item": 54,
    "name": "CICLO RÁPIDO",
    "type": "Super",
    "effect": "Descarta esta SuperCard y roba otra Power Card al azar de tu Deck.\n\nUna vez por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/054_ciclo_rapido.jpg"
  },
  {
    "id": "catalog_v3_055",
    "item": 55,
    "name": "MAESTRO DE FICHAS",
    "type": "Super",
    "effect": "Roba una ficha a un jugador, pero págale dos Poker Cards.\n\nHasta 2 veces por turno.",
    "appBehavior": "Ventana de  selección de jugador. Ventana emergente de \"descarte\" (pago) de cartas al otro jugador.",
    "asset": "assets/starter_cards/055_maestro_de_fichas_trade.jpg"
  },
  {
    "id": "catalog_v3_056",
    "item": 56,
    "name": "FALSO LIMITADOR",
    "type": "Super",
    "effect": "Limita el número de Poker Cards de un jugador a 5. Solo por este turno. Efectivo contra HyperCards previamente activas. Si tiene más de 5 Poker Cards, descarta el resto a elección de ese jugador.\n\nUna vez por turno.",
    "appBehavior": "",
    "asset": "assets/starter_cards/056_falso_limitador.jpg"
  }
];
