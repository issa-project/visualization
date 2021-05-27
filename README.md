# ISSA RDF DATA Modeling

## Namespaces
Below we use the following namespaces:
```turtle
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#>.
@prefix owl:    <http://www.w3.org/2002/07/owl#>.
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .

@prefix bibo:   <http://purl.org/ontology/bibo/> .
@prefix dce:    <http://purl.org/dc/elements/1.1/>.
@prefix dct:    <http://purl.org/dc/terms/>.
@prefix fabio:  <http://purl.org/spar/fabio/> .
@prefix foaf:   <http://xmlns.com/foaf/0.1/>.
@prefix frbr:   <http://purl.org/vocab/frbr/core#>.
@prefix oa:     <http://www.w3.org/ns/oa#>.
@prefix prov:   <http://www.w3.org/ns/prov#>.
@prefix schema: <http://schema.org/>.

@prefix aif:    <http://www.arg.dundee.ac.uk/aif#>.    # Argument Interchange Format
@prefix amo:    <http://purl.org/spar/amo/>.           # Argument Model Ontology (Toulmin)
@prefix sioca:  <http://rdfs.org/sioc/argument#>.      # SIOC Argumentation Module
@prefix umls:   <http://bioportal.bioontology.org/ontologies/umls/>.

@prefix covidp: <http://ns.inria.fr/covid19/property/> .
@prefix bibo: <http://purl.org/ontology/bibo/> .
```

## Article metadata
Article URIs are formatted as http://ns.inria.fr/covid19/issa/article_id where article_id may be either the article SHA hash or its PCM identifier.

Article metadata includes the following items:
Article metadata includes the following items:
- title (`dct:title`)
- authors (`dce:creator`)
- publication date (`dct:issued`)
- journal (`schema:publication`)
- license (`dct:license`)
- identifiers
    - DOI (`bibo:doi`)
    - Pubmed identifer (`bibo:pmid` and `fabio:hasPubMedId`)
    - PMC identifer (`fabio:hasPubMedCentralId`)
- source of the metadata information (`dct:source`)
- DOI-based URL (`schema:url`)
- SHA hash (`foaf:sha1`)
- language (` dce:language ` and `dct:language`)

Furthermore, each article is linked to its parts (title, abstract, body) as follows:
- `covidp:hasTitle <http://ns.inria.fr/covid19/issa/paper_id#title>`
- `dct:abstract     <http://ns.inria.fr/covid19/issa/paper_id#abstract>`
- `covidp:hasBody  <http://ns.inria.fr/covid19/issa/paper_id#body_text>`.

Here is an example of article metadata:
```
<http://ns.inria.fr/covid19/issa/f74923b3ce82c984a7ae3e0c2754c9e33c60554f>
  a schema:ScholarlyArticle, bibo:AcademicArticle, <http://purl.org/spar/fabio/ResearchPaper> ;
  rdfs:isDefinedBy <http://ns.inria.fr/covid19/issa/dataset-1-2> ;
  dct:title "A real-time PCR for SARS-coronavirus incorporating target gene pre-amplification" ;
  dce:creator "Tam, Siu-Lun", "Lin, Sau-Wah", "Yu, -H", "Collins, Richard", "Chan, Paul", "Wong, Freda Pui-Fan", "Dillon, Natalie", "Fung, Yin-Wan", "Cheung, Albert", "Yu, -Hoi", "Li, Hui", "Wang, Chen", "Lau,", "Lok, Ting" ;
  dct:source "Elsevier; Medline; PMC" ;
  dct:issued "2003-12-26"^^xsd:date ;
  bibo:doi "10.1016/j.bbrc.2003.11.064" ;
  bibo:pmid "14652014" ;
  dct:license "els-covid" ;
  foaf:sha1 "f74923b3ce82c984a7ae3e0c2754c9e33c60554f" ;
  schema:url <https://doi.org/10.1016/j.bbrc.2003.11.064> ;
  fabio:hasPubMedCentralId "PMC7111096" ;
  fabio:hasPubMedId "14652014" ;
  schema:publication "Biochemical and Biophysical Research Communications" ;
  dct:language <http://id.loc.gov/vocabulary/iso639-1/en>;
  dce:language "eng";
  covidp:hasTitle <http://ns.inria.fr/covid19/issa/f74923b3ce82c984a7ae3e0c2754c9e33c60554f#title> ;
  dct:abstract <http://ns.inria.fr/covid19/issa/f74923b3ce82c984a7ae3e0c2754c9e33c60554f#abstract> ;
  covidp:hasBody <http://ns.inria.fr/covid19/issa/f74923b3ce82c984a7ae3e0c2754c9e33c60554f#body_text> .
 
```
## Named entities

The named entities identified in an article are described as **annotations** using the **[Web Annotations Vocabulary](https://www.w3.org/TR/annotation-vocab/)**.
Each annotation consists of the following information:
- the article it is about (`schema:about`)
- the annotation target (`oa:hasTarget`) describes the piece of text identified as a named entity as follows:
    - the source (`oa:hasSource`) is the part of the article where the named entity was detected
    - the selecor (`oa:hasSelector`) gives the named entity raw text (`oa:exact`) and its location whithin the source (`oa:start` and `oa:end`)
- the annotation body (`oa:hasBody`) gives the URI of the resource identified as representing the named entity (e.g. a Wikidata URI)
- domains related to the named entity (`dct:subject`)

Example:
```turtle
_:b40150806	
    a                   oa:Annotation, prov:Entity;
    schema:about        <http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f>;
    dct:subject         "Engineering", "Biology";
    
    covidpr:confidence	"1"^^xsd:decimal;
    oa:hasBody          <http://wikidata.org/entity/Q176996>;
    oa:hasTarget [
        oa:hasSource    <http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f#abstract>;
        oa:hasSelector  [
            a           oa:TextPositionSelector, oa:TextQuoteSelector;
            oa:exact    "PCR";
            oa:start    "235";
            oa:end      "238"
        ]
    ];
```



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

