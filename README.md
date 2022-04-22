# Midi_Web_App_2
Application midi web controller Synth-T-Steel

Controleur pour instruments de musique Midi. 
Prototype d'essai qui utilise l'API WebMidi.js v3.0.0-alpha.26 (Fichier webmidi.iife.js) : https://webmidijs.org.

- - - - -

Pour pouvoir l'utiliser, il faut posséder une interface midi connectée à votre ordinateur. L'API doit la reconnaitre automatiquement.
Si vous n'en possédez pas ou qu'elle n'est pas reconnue, un message d"erreur apparaitra. L'application peut cependant être utilisée en simulation pour démonstration.
Pour l'heure cette application ne peux que piloter les synthétiseurs suivant :
- Roland Juno-106
- Roland Alpha-juno 1, 2, et MKS50
- Oberheim Matrix 6 et 6R
- (Baloran The Pool en simulation, en prévision de sa version "petit bain")
- (j'ai aussi dans l'idée que des controleurs de simulation d'anciens synthétiseurs analogiques non midifié, pourrait être créés et servir de pense bète aux réglages manuels de ces vieux instruments vintages tant prisés des musiciens dont je fait parti.)
 
La page d'accueil permet de choisir un controleur de synthétiseur mais comporte aussi un controleur standard Midi. (Note On, Note Off, Pitch, Prg change, Ctrl change ...). Les controls Midi Standard étant communs à n'importe quels synthétiseurs du marché, vous pourrez donc par exemple piloter une serie d'expandeurs en Midi Out avec un clavier maitre en Midi In. Un sequencer est aussi prévu dans les évolutions à venir.

J'ai testé l'application avec les interfaces midi de la carte son Focusrite Liquid Saffire 56 en thunderbold, du synthétiseur Baloran The River en USB, et du Woldorf Quantum en USB également. Ces 3 interfaces sont reconnu sans aucun probléme. J'ai cependant un bug non résolu, qui ne me permet pas de choisir mon interface et mon canal Midi d'entrée "In". Ce choix est possible qu'en sortie "Out" pour l'instant.

- - - - -

Technologie utilisée:
Javascript, jQuery, Html, CSS, Sass

Ce projet évolura dans sa prochaine version, en application Python Django.
Cette version devrait permettre de sauvegarder les sons créés en base de donnée, pouvant ainsi être rapellés.
(les boutons "Load" et "Save" sont actuellement inactifs, prévus à cet effets.)

- - - - -

A vos tests sur ce premier prototype ! Vos retours et avis seront bien venus.

Merci ...



