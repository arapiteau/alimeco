$(document).ready(function() {

    let ciqual = [];
    let colNames;
    let dontIncludeCols;
    let firstTimeOpeningModal = true;
    let addingFirstElement = true;
    let alreadySetDefaultNutritionalCheckboxConfiguration = false;
    let messageEmptyMeal = $('#message_empty_meal');
    let containerNutritionalValuesChoice = $('div.container-nutritional-values-choice');
    let containerTableMeal = $('.container-table-meal');
    let nutritionalCheckboxes = {};
    let liCheckboxList;
    // On initialise un tableau qui contiendra les totaux
    // let tableMealArray = [];
    // for (let i = 3; i < 61; i++) {
    //     tableMealArray[i] = [];
    // }
    let hiddenColumns = [];
    
    let properColNames = {
        'aliment': 'Aliment',
        'quantite': 'Quantité',
        'prix_kg' : 'Prix au kg',
        'prix': 'Prix pour la quantité',
        'energie_ue_kcal': 'Énergie',
        'eau': 'Eau',
        'proteines': 'Protéines',
        'glucides': 'Glucides totaux',
        'lipides': 'Lipides totaux',
        'sucres': 'Sucres',
        'amidon': 'Amidon',
        'fibres': 'Fibres',
        'polyols': 'Polyols',
        'cendres': 'Cendres',
        'alcool': 'Alcool',
        'acides_organiques': 'Acides organiques',
        'acides_gras_satures': 'Acides gras saturés',
        'acides_gras_monoinsatures': 'Acides gras monoinsaturés',
        'acides_gras_polyinsatures': 'Acides gras polyinsaturés',
        'acide_butyrique': 'Acide butyrique',
        'acide_caproique': 'Acide caproïque',
        'acide_caprylique': 'Acide caprylique',
        'acide_caprique': 'Acide caprique',
        'acide_laurique': 'Acide laurique',
        'acide_myristique': 'Acide myristique',
        'acide_palmitique': 'Acide palmitique',
        'acide_stearique': 'Acide stéarique',
        'acide_oleique': 'Acide oléique',
        'acide_linoleique': 'Acide linoléique (omega-6)',
        'acide_alpha_linolenique': 'Acide alpha-linolénique (omega-3)',
        'acide_arachidonique': 'Acide arachidonique',
        'epa': 'EPA',
        'dha': 'DHA',
        'cholesterol': 'Cholestérol',
        'sel': 'Sel',
        'calcium': 'Calcium',
        'chlorure': 'Chlorure',
        'cuivre': 'Cuivre',
        'fer': 'Fer',
        'iode': 'Iode',
        'magnesium': 'Magnésium',
        'manganese': 'Manganèse',
        'phosphore': 'Phosphore',
        'potassium': 'Potassium',
        'selenium': 'Sélénium',
        'sodium': 'Sodium',
        'zinc': 'Zinc',
        'retinol': 'Rétinol',
        'beta_carotene': 'Bêta-carotène',
        'vitamine_d': 'Vitamine D',
        'vitamine_e': 'Vitamine E',
        'vitamine_k1': 'Vitamine K1',
        'vitamine_k2': 'Vitamine K2',
        'vitamine_c': 'Vitamine C',
        'vitamine_b1': 'Vitamine B1',
        'vitamine_b2': 'Vitamine B2',
        'vitamine_b3': 'Vitamine B3',
        'vitamine_b5': 'Vitamine B5',
        'vitamine_b6': 'Vitamine B6',
        'vitamine_b9': 'Vitamine B9',
        'vitamine_b12': 'Vitamine B12'
    };

    let tableMealJSON = {};
    for (key in properColNames) {
        tableMealJSON[key] = {};
    }

    let elementsChecked = [];

    let colNamesByNum = Object.keys(properColNames);
    
    let colUnits = {
        'prix' : '€',
        'energie_ue_kcal': 'kcal',
        'eau': 'g',
        'proteines': 'g',
        'glucides': 'g',
        'lipides': 'g',
        'sucres': 'g',
        'amidon': 'g',
        'fibres': 'g',
        'polyols': 'g',
        'cendres': 'g',
        'alcool': 'g',
        'acides_organiques': 'g',
        'acides_gras_satures': 'g',
        'acides_gras_monoinsatures': 'g',
        'acides_gras_polyinsatures': 'g',
        'acide_butyrique': 'g',
        'acide_caproique': 'g',
        'acide_caprylique': 'g',
        'acide_caprique': 'g',
        'acide_laurique': 'g',
        'acide_myristique': 'g',
        'acide_palmitique': 'g',
        'acide_stearique': 'g',
        'acide_oleique': 'g',
        'acide_linoleique': 'g',
        'acide_alpha_linolenique': 'g',
        'acide_arachidonique': 'g',
        'epa': 'g',
        'dha': 'g',
        'cholesterol': 'mg',
        'sel': 'g',
        'calcium': 'mg',
        'chlorure': 'mg',
        'cuivre': 'mg',
        'fer': 'mg',
        'iode': 'µg',
        'magnesium': 'mg',
        'phosphore': 'mg',
        'potassium': 'mg',
        'selenium': 'µg',
        'sodium': 'mg',
        'zinc': 'mg',
        'retinol': 'µg',
        'beta_carotene': 'µg',
        'vitamine_d': 'µg',
        'vitamine_e': 'mg',
        'vitamine_k1': 'µg',
        'vitamine_k2': 'µg',
        'vitamine_c': 'mg',
        'vitamine_b1': 'mg',
        'vitamine_b2': 'mg',
        'vitamine_b3': 'mg',
        'vitamine_b5': 'mg',
        'vitamine_b6': 'mg',
        'vitamine_b9': 'µg',
        'vitamine_b12': 'µg',
        'manganese': 'mg'
    };

    function addArray(array, toAdd) {
        let result = array.slice();
        for (element of toAdd) {
            result.push(element);
        }
        return result;
    }

    function addElementAfter(array, toAdd, adjacent) {
        let result = array.slice();
        let position = result.indexOf(adjacent);
        if (position != -1) {
            if (position == result.length) {
                result.push(toAdd);
            }
            else {
                result.splice(array.indexOf(adjacent)+1, 0, toAdd);
            }
            return result;
        }
    }

    function addElementAfterIndex(array, toAdd, index) {
        let result = array.slice();
        if (index == result.length) {
            result.push(toAdd);
        }
        else {
            result.splice(index, 0, toAdd);
        }
        return result;
    }



    function addStrToAllElements(strArray, str) {
        let result = [];
        for (element of strArray) {
            result.push(str + " " + element);
        }
        return result;
    }

    // Fonction pour ajouter hidden (colonnes cachées vides)
    function addHiddenToClassNameOfCells(strArray, toHide) {
        let result = [];
        for (element of strArray) {
            if (toHide.includes(element)) {
                result.push('hidden');
                result.push(element + ' hidden');
            }
            else if (toHide.includes(element)) {
                result.push('hidden');
                result.push(element + ' hidden');
            }
            else {
                result.push(element);
            }
        }
        return result;
    }



    function replaceElement(array, toReplace, replacement) {
        let result = array.slice();
        let i = result.indexOf(toReplace);
        while (i != -1) {
            result.splice(i, 1, replacement);
            i = result.indexOf(toReplace);
        }
        return result;
    }

    function generateTr(array, cellType, id=null, classNameOfCells=null, arrayClassNameOfCells=null) {
        let strId = '';
        let strClass = '';
        if (id != null) {
            strId = ' id="' + id + '"';
        }
        if (classNameOfCells != null) {
            strClass = ' class="' + classNameOfCells + '"';
        }
        let content = '<tr' + strId + '>';
        let closingTag = '</' + cellType + '>';
        for (i in array) {
            let strClassSpec = '';
            if (arrayClassNameOfCells !== null && typeof arrayClassNameOfCells[i] !== 'undefined' && arrayClassNameOfCells[i] != '') {
                strClassSpec = ' class="' + arrayClassNameOfCells[i] + '"';
            }
            let openingTag = '<' + cellType + strClass + strClassSpec + '>';
            content += (openingTag + array[i] + closingTag)
        }
        content += '</tr>';
        return content;
    }

    function withoutCols(obj, dontIncludeCols) {
        let result = {};
        for (key in obj) {
            if (!dontIncludeCols.includes(key)) {
                result[key] = obj[key];
            }
        }
        return result;
    }

    function withoutColsArray(array, dontIncludeCols) {
        let result = [];
        for (key in array) {
            if (!dontIncludeCols.includes(array[key])) {
                result.push(array[key]);
            }
        }
        return result;
    }

    function getProductName(tr) {
        return $(tr).children().eq(2).text();
    }

    function getProductByName(arrayCiqual, name) {
        for (product of arrayCiqual) {
            if (product.nom == name) {
                return product;
            }
        }
    }

    function countChecked(checkboxes) {
        let count = 0;
        $(checkboxes).each(function() {
            if ($(this).is(':checked')) {
                count += 1;
            }
        });
        return count;
    }

    function dotToComma(str) {
        return str.replace(/\./g, ',');
    }

    function dotToCommaArray(strArray, startIndex = 0, endIndex = strArray.length) {
        let result = strArray.slice();
        for (key in result) {
            if (key >= startIndex && key < endIndex) {
                result[key] = dotToComma(result[key]);
            }            
        }
        return result;
    }

    function getIndexesWithStr(strArray, toFind) {

    }

    function commaToDot(str) {
        return str.replace(/,/g, '.');
    }

    function makeTHeadTableMeal() {
        
    }

    function isValidDecimal(decStr) {
        return /^(?:([0-9]+)(?:[\.,]([0-9]+))?)?$/.test(decStr);
    }

    function decimalStrToFloat(decStr) {
        return (decStr == '' ? 0 : parseFloat(commaToDot(decStr)));
    }

    function floatToDecimalStr(float, numberOfDec) {
        return dotToComma(float.toFixed(numberOfDec).toString());
    }

    class NutritionalCheckbox {
        constructor(checkbox, parent) {
            this.checkbox = checkbox;
            this.parent = parent;
            if (this.parent != null) {
                this.parent.addChild(this);
            }
        }
    }

    NutritionalCheckbox.prototype.getParent = function() {
        return this.parent;
    }

    NutritionalCheckbox.prototype.setParent = function(parent) {
        this.parent = parent;
    }

    NutritionalCheckbox.prototype.getCheckbox = function() {
        return this.checkbox;
    }

    // NutritionalCheckbox.prototype.findTopParentAndUpdate = function() {
    //     let parent = this.parent;
    //     if (parent = null) {
    //         this.updateState();
    //     }
    //     else {
    //         parent.findTopParentAndUpdate();
    //     }
    // }

    class NutritionalValueCheckbox extends NutritionalCheckbox {
        constructor(checkbox, parent) {
            super(checkbox, parent);
        }
    }

    class NutritionalCategoryCheckbox extends NutritionalCheckbox{
        constructor(checkbox, parent) {
            super(checkbox, parent);
            this.children = [];
        }
    }  
    
    
    
    NutritionalValueCheckbox.prototype = Object.create(NutritionalCheckbox.prototype);
    NutritionalValueCheckbox.prototype.constructor = NutritionalValueCheckbox;

    NutritionalCheckbox.prototype.getState = function() {
        return $(this.checkbox).is(':checked');
    };

    NutritionalCheckbox.prototype.updateParents = function() {
        let parent = this;
        while (parent = parent.getParent()) {
            let allChecked = true, noneChecked = true;             
            for (child of parent.getChildren()) {
                let isCheckedChild = $(child.getCheckbox()).is(':checked');
                let isIndeterminateChild = $(child.getCheckbox()).prop('indeterminate');
                allChecked = allChecked && isCheckedChild && !isIndeterminateChild;
                noneChecked = noneChecked && !isCheckedChild && !isIndeterminateChild;
            }
            if (allChecked) {
                parent.setState('indeterminate', false);
                parent.setState('checked', true);
            }
            else if (noneChecked) {
                parent.setState('indeterminate', false);
                parent.setState('checked', false);
            }
            else {
                parent.setState('checked', false);
                parent.setState('indeterminate', true);
            }    
        }
    }

    // On change l'état de la checkbox depuis un parent
    NutritionalValueCheckbox.prototype.updateState = function(val) {
        $(this.checkbox).prop('checked', val);
        this.toggleBoundColumn();
    }

    NutritionalValueCheckbox.prototype.toggleBoundColumn = function() {
        let checkboxColName = $(this.checkbox).attr('id');
        if (this.getState()) { // Si la checkbox vient d'être cochée
            let previousHTMLElement = $('#table_meal .' + checkboxColName).prev();
            if ($(previousHTMLElement).attr('class') == 'hidden' || $(previousHTMLElement).attr('class') == 'nutritional-value-for-quantity hidden') {
                $(previousHTMLElement).remove();
                $('#table_meal .' + checkboxColName).removeClass('hidden');
                hiddenColumns = withoutColsArray(hiddenColumns, Array(1).fill(checkboxColName));
            }
            else {}
        } else {
            $('#table_meal .' + checkboxColName).addClass('hidden');
            $('#table_meal th.' + checkboxColName).before('<th class="hidden"></th>');
            $('#table_meal td.' + checkboxColName).before('<td class="hidden"></td>');
            hiddenColumns.push(checkboxColName);
        }
        // console.log(hiddenColumns);
    }

    // NutritionalValueCheckbox.prototype.updateState = function() {
    //     if ($(this.checkbox).is('checked')) {
    //         this.state = 'checked';
    //     }
    //     else {
    //         this.state = 'unchecked'
    //     }
    //     return this.state;
    // };

      

    
    NutritionalCategoryCheckbox.prototype = Object.create(NutritionalCheckbox.prototype);
    NutritionalCategoryCheckbox.prototype.constructor = NutritionalCategoryCheckbox;
    
    NutritionalCategoryCheckbox.prototype.addChild = function(child) {
        this.children.push(child);
        // child.setParent(this);
    }

    NutritionalCategoryCheckbox.prototype.updateState = function(val) {     
        $(this.checkbox).prop('indeterminate', false)
        $(this.checkbox).prop('checked', val);
        for (const child of this.children) {
            child.updateState(val);
        }
    }

    NutritionalCategoryCheckbox.prototype.getChildren = function() {
        return this.children;
    }

    NutritionalCategoryCheckbox.prototype.setState = function(propName, bool) {
        $(this.checkbox).prop(propName, bool);
    }

    // NutritionalCategoryCheckbox.prototype.updateState = function() {
    //     let allChecked = true, noneChecked = true;
    //     for (const child of this.children) {
    //         let isCheckedChild = child.updateState();
    //         allChecked = (allChecked && (isCheckedChild == 'checked'));
    //         noneChecked = (noneChecked && (isCheckedChild == 'unchecked')); 
    //     }
    //     if (allChecked) {
    //         this.state = 'checked';
    //     }
    //     else if (noneChecked) {
    //         this.state = 'unchecked';
    //     }
    //     else {
    //         this.state = 'partially';
    //     }
    //     return this.state;
    // }

    function createStructure(liCheckboxList, parent) {
        for (li of liCheckboxList) {
            if ($(li).children().eq(0).is('ul')) {}
            else {
                let siblingChild = $(li).next().children().eq(0);
                let checkbox = $(li).children().eq(0);
                if (!$(siblingChild).is('ul')) {
                    nutritionalCheckboxes[$(checkbox).attr('id')] = new NutritionalValueCheckbox(checkbox, parent);
                }
                else {
                    nutritionalCheckboxes[$(checkbox).attr('id')] = new NutritionalCategoryCheckbox(checkbox, parent);
                    createStructure($(siblingChild).children(), nutritionalCheckboxes[$(checkbox).attr('id')]);
                }
            }
        }
    }

    function buildNutritionalCheckboxes() {        
        liCheckboxList = $('.container-nutritional-checkboxes > li'); 

        createStructure(liCheckboxList, null);

        Object.keys(nutritionalCheckboxes).forEach(function(index) {
            let checkbox = nutritionalCheckboxes[index].getCheckbox();
            $(checkbox).change(function() {
                // On met à jour la checkbox et on propage vers les éventuels enfants
                nutritionalCheckboxes[index].updateState($(this).prop('checked'));
                // On met à jour le parent (et le parent du parent, etc.)
                nutritionalCheckboxes[index].updateParents();
            });
        });

        setDefaultCheckboxConfiguration();
    }

    function setDefaultCheckboxConfiguration() {
        let checked = ['energie_ue_kcal', 'proteines', 'glucides', 'sucres', 'lipides', 'fibres', 'acides_gras_satures', 'acides_gras_insatures', 'acides_gras_polyinsatures', 'acides_gras_monoinsatures', 'epa', 'dha', 'cholesterol', 'retinol', 'beta_carotene', 'vitamine_b1', 'vitamine_b2', 'vitamine_b3', 'vitamine_b5', 'vitamine_b6', 'vitamine_b9', 'vitamine_b12', 'vitamine_c', 'vitamine_d', 'vitamine_e', 'vitamine_k1', 'vitamine_k2', 'sel', 'calcium', 'chlorure', 'cuivre', 'fer', 'iode', 'magnesium', 'manganese', 'phosphore', 'potassium', 'selenium', 'sodium', 'zinc'];
        let unchecked = withoutColsArray(Object.keys(properColNames), addArray(checked, ['aliment', 'quantite', 'prix_kg', 'prix']));
        // console.log(checked);
        // console.log(unchecked);
        
        // Doit être dans ce sens !
        unchecked.forEach(function(index) {
            nutritionalCheckboxes[index].updateState(false);
            nutritionalCheckboxes[index].updateParents();
        });
        checked.forEach(function(index) {
            nutritionalCheckboxes[index].updateState(true);
            nutritionalCheckboxes[index].updateParents();
        });
    }  

    function buildTHeadTFootTableMeal() {
        // On initialise les valeurs du thead et du tfoot d'abord avec les noms des colonnes qui ne sont pas des noms de nutriments/des colonnes de la BDD
        let thsHeadTableMeal = ['Aliment', 'Quantité', 'Prix au kg', 'Prix<br />(qté)'];
        let thsFootTableMeal = ['Totaux', '-', '-', ''];

        // On supprime parmi les colonnes de la BDD les colonnes qui ne nous intéressent pas
        // let nutritionalValuesColumns = withoutColsArray(colNames, ['id', 'id_ciqual', 'energie_ue_kj', 'energie_fib_kj', 'energie_fib_kcal', 'proteines_brutes', 'nom', 'numero_sous_categorie', 'sous_categorie']);
        
        // On fait une copie superficielle du tableau ci-dessus : le premier sert aux valeurs nutritionnelles pour la qté, le deuxième pour les valeurs nutritionnelles de l'aliment (pour 100 g)
        // let nutritionalValuesColsPer100g = nutritionalValuesColumns.slice();
        let nutritionalValuesColumns = [];
        let nutritionalValuesColsPer100g = [];
        // On initialise les tableaux qui contiendront les valeurs du tfoot sur la même construction en 2 parties que les valeurs du thead
        let nutritionalValuesColsPer100gFoot = [];
        let totalNutritionalValuesColumns = [];

        // for (i in nutritionalValuesColsPer100g) {
        //     nutritionalValuesColumns[i] = properColNames[nutritionalValuesColumns[i]] + '<br />(qté)';
        //     nutritionalValuesColsPer100g[i] = properColNames[nutritionalValuesColsPer100g[i]] + '<br />(100 g)';

        //     nutritionalValuesColsPer100gFoot[i] = '-';
        //     totalNutritionalValuesColumns[i] = '';
        // }

        for (const colName in withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg', 'prix'])) {
            if (hiddenColumns.includes(colName)) {
                nutritionalValuesColumns.push('');
                nutritionalValuesColsPer100g.push('');
                totalNutritionalValuesColumns.push('');
                nutritionalValuesColsPer100gFoot.push('');
            }   
            nutritionalValuesColumns.push(properColNames[colName] + '<br />(qté)'); 
            nutritionalValuesColsPer100g.push(properColNames[colName] + '<br />(100 g)');
            totalNutritionalValuesColumns.push('');
            nutritionalValuesColsPer100gFoot.push('-');
        }
        
        thsHeadTableMeal = addArray(thsHeadTableMeal, addArray(nutritionalValuesColumns, nutritionalValuesColsPer100g));
        thsFootTableMeal = addArray(thsFootTableMeal, addArray(totalNutritionalValuesColumns, nutritionalValuesColsPer100gFoot));



        // let classNameOfCells = addArray(Object.keys(properColNames), Object.keys(withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg', 'prix'])));

        let classNamesHidden = addHiddenToClassNameOfCells(Object.keys(withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg', 'prix'])), hiddenColumns);

        let classNameOfFirstCells = addArray(['aliment', 'quantite', 'prix_kg', 'prix'], addStrToAllElements(classNamesHidden, 'nutritional-value-for-quantity'));
        let classNameOfLastCells = addStrToAllElements(classNamesHidden, 'nutritional-value-for-100g');
        let classNameOfCells = addArray(classNameOfFirstCells, classNameOfLastCells);
        // console.log(classNameOfCells);

        $('#table_meal thead').append(generateTr(thsHeadTableMeal, 'th', null, null, classNameOfCells));
        $('#table_meal tfoot').append(generateTr(thsFootTableMeal, 'th', null, null, classNameOfCells));   
    }
    
    function fillCiqualTableWith(productArray) {
        // Ajouter les valeurs -> les td dans les tr dans le tbody, si null mettre un - au lieu de null
        let tbodyContent = '';
        let values;
        let line;
        for (const key in productArray) {          
            line = $.extend({}, productArray[key]); // Permet de faire une copie superficielle d'un objet
            line = withoutCols(line, dontIncludeCols);           
            values = Object.values(line);
            values = replaceElement(values, null, '-');
            values = dotToCommaArray(values, 3); // 3 est l'indice de la première colonne avec une VN (énergie) donc une valeur numérique
            values = addElementAfterIndex(values, '<input type="checkbox">', 3); // 3 est l'indice de la colonne où l'on souhaite insérer l'input (avant les VN)
            tbodyContent += generateTr(values, 'td', 'ciqual_' + productArray[key].id);
        }
        
        $('#ciqual_table tbody').append(tbodyContent);

        $('#ciqual_table tbody tr').each(function() {
            let trMealId = /ciqual_([0-9]+)/.exec($(this).attr('id'))[1];
            if (elementsChecked.includes(trMealId)) {
                $(this).find('input:checkbox').prop('checked', true);
                $(this).addClass('selected-row');
            }
        })
    }

    function buildCiqualTable() {
        // Ajouter le nom des colonnes -> les th dans le tr dans le thead avec les clés des éléments des objets JSON de l'array JS ciqual (renvoyé par AJAX)
        dontIncludeCols = withoutColsArray(colNames, ['numero_sous_categorie', 'sous_categorie', 'nom']);
        // let thNames = withoutColsArray(colNames, dontIncludeCols);
        let thNames = ['', 'Sous-catégorie', 'Nom de l\'aliment', 'Ajouter'];
        // thNames = addElementAfter(thNames, 'Sélectionner', 'nom');
        $('#ciqual_table thead').append(generateTr(thNames, 'th'));

        fillCiqualTableWith(ciqual);        
    }

    function buildRowOfProductTableMeal(product) {  
        console.log(product.id);    
        let tdsTableMeal = [product.nom, '<input type="text" class="product_quantity" size="6">', '<input type="text" class="price_kg" size="6">', ''];
        let nutritionalValuesProductArray = [];
        let nutritionalValuesProduct = withoutCols(product, ['id', 'id_ciqual', 'energie_ue_kj', 'energie_fib_kj', 'energie_fib_kcal', 'proteines_brutes', 'nom', 'numero_sous_categorie', 'sous_categorie']);
        let nutritionalValuesPer100g = [];
        for (const colName in withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg', 'prix'])) {
            if (hiddenColumns.includes(colName)) {
                nutritionalValuesProductArray.push('');
                nutritionalValuesPer100g.push('');
            }
            nutritionalValuesProductArray.push('');
            if (product[colName] == null) {
                nutritionalValuesPer100g.push('-');
            }
            else {
                nutritionalValuesPer100g.push(dotToComma(product[colName]) + ' ' + colUnits[colName]);
            }            
        }

        tdsTableMeal = addArray(tdsTableMeal, addArray(nutritionalValuesProductArray, nutritionalValuesPer100g));

        // console.log(tdsTableMeal);

        let classNamesHidden = addHiddenToClassNameOfCells(Object.keys(withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg', 'prix'])), hiddenColumns);

        let classNameOfFirstCells = addArray(['aliment', 'quantite', 'prix_kg', 'prix'], addStrToAllElements(classNamesHidden, 'nutritional-value-for-quantity'));
        let classNameOfLastCells = addStrToAllElements(classNamesHidden, 'nutritional-value-for-100g');
        let classNameOfCells = addArray(classNameOfFirstCells, classNameOfLastCells);

        // console.log(classNameOfCells);

        
        $('#table_meal tbody').append(generateTr(tdsTableMeal, 'td', 'meal_' + product.id, null, classNameOfCells));
    }

    function setupQuantityInput(product) {
        // Lorsque l'on saisit une quantité
        $('#meal_' + product.id + ' .product_quantity').on('keyup', function() {
            // On vérifie que la quantité saisie est valide
            let quantityStr = $(this).val();
            if (isValidDecimal(quantityStr)) {
                let quantity = decimalStrToFloat(quantityStr);

                let priceKgStr = $('#meal_' + product.id + ' .price_kg').val();
                if (isValidDecimal(priceKgStr)) {
                    let priceKg = decimalStrToFloat(priceKgStr);
                    let price = priceKg * 0.001 * quantity;
                    // tableMealArray[3][product.id] = price;
                    tableMealJSON['prix'][product.id] = price;
                    $('#meal_' + product.id + ' td.prix').text(dotToComma(price.toFixed(2).toString()) + ' €');
                }

                // On modifie toutes les valeurs du table_meal qui dépendent de la quantité (valeurs nutritionnelles pour la quantité cases 4 à 60, à refaire sans coder les indices en dur)
                // for (let i = 4; i < 61; i++) {
                //     // On récupère la valeur nutritionnelle pour 100 g de l'aliment
                //     let per100g = parseFloat(commaToDot($('#table_meal #meal_'+product.id+' td:eq('+ (i+57) +')').text())); // À changer absolument, garder en mémoire les valeurs nutritionnelles des aliments ajoutés au table_meal
                //     if (!isNaN(per100g)) {
                //         let valueForQuantity = quantity * 0.01 * per100g;
                //         tableMealArray[i][product.id] = valueForQuantity;

                //         $('#table_meal #meal_' + product.id + ' td:eq('+i+')').text(dotToComma(valueForQuantity.toFixed(2).toString()) + ' ' + colUnits[colNamesByNum[i]]);
                //     }
                //     else {
                //         tableMealArray[i][product.id] = 0;
                //         $('#table_meal #meal_' + product.id + ' td:eq('+i+')').text('-');
                //     }
                // }

                // On modifie toutes les valeurs du table_meal qui dépendent de la quantité (valeurs nutritionnelles pour la quantité cases 4 à 60, à refaire sans coder les indices en dur)
                for (const colName in withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg', 'prix'])) {
                    // On récupère la valeur nutritionnelle pour 100 g de l'aliment
                    let per100g = parseFloat(ciqual[parseInt(product.id)][colName]); // On tire profit du fait que le tableau ciqual est un array dont les index correspondent exactement aux id des JSON éléments de l'array (il faut convertir les id en entier ici) - il faut que les id restent les mêmes en base de données !
                    if (!isNaN(per100g)) {
                        let valueForQuantity = quantity * 0.01 * per100g;
                        tableMealJSON[colName][product.id] = valueForQuantity;

                        $('#table_meal #meal_' + product.id + ' td.nutritional-value-for-quantity.' + colName).text(dotToComma(valueForQuantity.toFixed(2).toString()) + ' ' + colUnits[colName]);
                    }
                    else {
                        tableMealJSON[colName][product.id] = 0;
                        $('#table_meal #meal_' + product.id + ' td.nutritional-value-for-quantity.' + colName).text('-');
                    }
                }

                // console.log(tableMealArray);

                // On met à jour la ligne des totaux (tfoot)
                // for (let i = 3; i < 61; i++) {
                //     let totalForColI = 0;
                //     for (j in tableMealArray[i]) {
                //         totalForColI += tableMealArray[i][j];
                //     }
                //     $('#table_meal tfoot th:eq('+i+')').text(dotToComma(totalForColI.toFixed(2).toString()) + ' ' + colUnits[colNamesByNum[i]]);
                // }

                for (const colName in withoutCols(properColNames, ['aliment', 'quantite', 'prix_kg'])) {
                    let totalForCurrentCol = 0;
                    let className = '';
                    for (id in tableMealJSON[colName]) {
                        totalForCurrentCol += tableMealJSON[colName][id];
                    }
                    if (colName != 'prix') {
                        className = 'nutritional-value-for-quantity.';
                    }
                    $('#table_meal tfoot th.' + className + colName).text(dotToComma(totalForCurrentCol.toFixed(2).toString()) + ' ' + colUnits[colName]);
                }
            }
        });
    }

    function setupPriceInput(product) {
        $('#meal_' + product.id + ' .price_kg').on('keyup', function() {
            let priceKgStr = $(this).val();

            if (isValidDecimal(priceKgStr)) {
                let quantityStr = $('#meal_' + product.id + ' .product_quantity').val();
                if (isValidDecimal(quantityStr)) {
                    let priceKg = decimalStrToFloat(priceKgStr), quantity = decimalStrToFloat(quantityStr);
                    let price = priceKg * 0.001 * quantity;
                    tableMealJSON['prix'][product.id] = price;
                    // tableMealArray[3][product.id] = price;
                    $('#meal_' + product.id + ' td.prix').text(dotToComma(price.toFixed(2).toString()) + ' €');
                }
            }

            // On met à jour le prix total dans le tfoot
            let totalForPriceCol = 0;
            for (id in tableMealJSON['prix']) {
                totalForPriceCol += tableMealJSON['prix'][id];
            }
            $('#table_meal tfoot th.prix').text(dotToComma(totalForPriceCol.toFixed(2).toString()) + ' €');
        });
    }

    function handleRemovalUncheckedProduct(id) {
        // On récupère l'id de la ligne du tableau table_ciqual sous la forme ciqual_xxx pour en déduire l'id de la ligne du table_meal à enlever sous la forme meal_xxx
        elementsChecked = withoutColsArray(elementsChecked, Array(1).fill(id));
        // for (let i = 3; i < 61; i++) {
        //     //console.log('tableMealArray['+i+']['+parseInt(trMealId)+'] = ' + tableMealArray[i][parseInt(trMealId)]);
        //     delete tableMealArray[i][parseInt(trMealId)];
        //     let totalForColI = 0;
        //     for (j in tableMealArray[i]) {
        //         totalForColI += tableMealArray[i][j];
        //     }
        //     $('#table_meal tfoot th:eq('+i+')').text(dotToComma(totalForColI.toFixed(2).toString()) + ' ' + colUnits[colNamesByNum[i]]);
        // }

        let allTextInputsAreEmpty = true;
        $('input:text .product_quantity, input:text .price_kg').each(function(index) {
            allTextInputsAreEmpty = allTextInputsAreEmpty && ($(this).val() == '');
        });
        if (allTextInputsAreEmpty) {
            $('#table_meal tfoot th.nutritional-value-for-quantity').text('');
        }
        else {
            for (const colName in withoutCols(properColNames, ['aliment', 'prix_kg', 'quantite'])) {
                //console.log('tableMealArray['+i+']['+parseInt(trMealId)+'] = ' + tableMealArray[i][parseInt(trMealId)]);
                delete tableMealJSON[colName][trMealId];
                let totalForCurrentCol = 0;
                for (const id in tableMealJSON[colName]) {
                    totalForCurrentCol += tableMealJSON[colName][id];
                }
                $('#table_meal tfoot th.nutritional-value-for-quantity.' + colName).text(dotToComma(totalForCurrentCol.toFixed(2).toString()) + ' ' + colUnits[colName]);
            }
        }
        
        $('#meal_' + id).remove();
        $('li#checked_element_' + id).remove();
        // Si on vient d'enlever le dernier élément du table_meal, on retire header et footer, on affiche le message par défaut
        if (elementsChecked.length == 0) {
            $(messageEmptyMeal).removeClass('hidden');
            $(containerNutritionalValuesChoice).addClass('hidden');
            $('.container-table-meal').addClass('hidden');
            $('#table_meal thead, #table_meal tfoot').empty();
            addingFirstElement = true;
        }
    }

    function setupProductCheckboxes() {
        let tableMeal = $('#table_meal');
        
        // Lorsqu'on coche ou décoche un élément de la ciqual_table
        $('#ciqual_table input:checkbox').each(function() {
            $(this).change(function() {
                let tr = $(this).parent().parent(); 
                let trMealId = /ciqual_([0-9]+)/.exec($(tr).attr('id'))[1];
                // Rechercher l'objet/la ligne de l'array ciqual qui a le même nom que le tr parent de la checkbox
                let product = getProductByName(ciqual, getProductName(tr));               

                $(tr).toggleClass('selected-row');                
                $(tableMeal).removeClass('hidden');

                

                if (addingFirstElement) {
                    addingFirstElement = false; 
                    if (!alreadySetDefaultNutritionalCheckboxConfiguration) {
                        alreadySetDefaultNutritionalCheckboxConfiguration = true;
                        buildNutritionalCheckboxes();
                        // console.log(hiddenColumns);
                    }                  
                    buildTHeadTFootTableMeal();                    
                }

                

                // Si on vient de cocher l'élément écouté
                if ($(this).is(':checked')) {   
                    if (!$(messageEmptyMeal).hasClass('hidden')) {
                        $(messageEmptyMeal).addClass('hidden');
                    }

                    if ($(containerTableMeal).hasClass('hidden')) {
                        $(containerTableMeal).removeClass('hidden');
                    }

                    if ($(containerNutritionalValuesChoice).hasClass('hidden')) {
                        $(containerNutritionalValuesChoice).removeClass('hidden');
                    }
                    
                    elementsChecked.push(product.id);

                    // On pourrait faire let trMealId = /ciqual_([0-9]+)/.exec($(tr).attr('id'))[1]; let product = ciqual[trMealId]; 
                    addToCheckedElementsRecap(product);
                    buildRowOfProductTableMeal(product);
                    setupQuantityInput(product);
                    setupPriceInput(product);
                }
                // Si on vient de décocher l'élément écouté
                else {                    
                    handleRemovalUncheckedProduct(trMealId);
                }
            });                   
        });    
    }

    function addToCheckedElementsRecap(product) {
        let checkedElementLiStr = '<li class="checked-element" id="checked_element_' + product.id + '"><span class="delete-btn"><i class="fas fa-trash-alt"></i></span><span class="checked-element-text">' + product.nom + '</span></li>';

        $('div.checked-elements-container ul').append(checkedElementLiStr);

        $('li#checked_element_' + product.id + ' .delete-btn').on('click', function() {
                let trCiqual = $('#ciqual_table tr#ciqual_' + product.id);
                $(trCiqual).removeClass('selected-row');
                $(trCiqual).find('input:checkbox').prop('checked', false);
                handleRemovalUncheckedProduct(product.id);
        });
    }

    function researchInCiqual(e) {
        let searchTerm = $(this).val();
        if (searchTerm.length >= 3 && e.keyCode === 13) {
            let regExp = new RegExp(/(?:(\S+)(?:\s+))*?(\S+)?(?:\s*)/, 'ig');
            let separateWords = [...searchTerm.matchAll(regExp)]; // les mots du terme sont séparés d'un espace au moins et le terme se termine (éventuellement) par un mot non suivi d'espace
            let exactResults = [];
            let allWordsResults = [];
            for (key in ciqual) {
                console.log(ciqual[key]);
                if (ciqual[key].nom.toLowerCase().includes(searchTerm.toLowerCase())) { 
                    exactResults.push(ciqual[key]);
                }
                else {
                    let lengthSeparateWords = separateWords.length;
                    if (lengthSeparateWords > 0) {
                        let containsAllWords = true;
                        for (index in separateWords.slice(0, lengthSeparateWords - 1)) {
                            containsAllWords = containsAllWords && (ciqual[key].nom.toLowerCase().includes(separateWords[index][2].toLowerCase()))
                        }
                        if (containsAllWords) {
                            allWordsResults.push(ciqual[key]);
                        }
                    }
                }
            }
            let ciqualTBody = $('#ciqual_table tbody');
            $(ciqualTBody).empty();
            if (exactResults.length == 0 && allWordsResults == 0) {
                $(ciqualTBody).html('<div class="alert alert-info">Aucun résultat trouvé pour cette recherche.</div>');
            }
            else {
                fillCiqualTableWith(addArray(exactResults, allWordsResults));
                setupProductCheckboxes();
            }
        }
    }

    function setupSearchBar() {
        let searchBar = $('.clear-search-bar');
        $(searchBar).on('keyup', researchInCiqual);

        let clearSearchBar = $('.fas.fa-eraser');
        $(clearSearchBar).click(function() {
            $(searchBar).val('');
            if ($('#ciqual_table tbody tr').length != 2642) {
                $('#ciqual_table tbody').empty();
                fillCiqualTableWith(ciqual);
                setupProductCheckboxes();
            }
        });
    }

    function startCalculator(response) {
        ciqual = response;
        // console.log(ciqual[0]);


        colNames = Object.keys(ciqual[0]);
        // console.log(colNames);
        dontIncludeCols = ['id', 'id_ciqual', 'energie_ue_kj', 'energie_fib_kj', 'energie_fib_kcal', 'proteines_brutes'];

        buildCiqualTable();
        setupProductCheckboxes();
        setupSearchBar();
    }

    function getCiqualTableAjax() {
        if (firstTimeOpeningModal) {
            firstTimeOpeningModal = false;
            $.ajax({
                url: 'productsearch.php',
                data: 'wholeTable=1',
                dataType: 'json',
                method: 'POST',
                success: startCalculator
            });
        }
    }

    $('#open_ciqual').on('click', getCiqualTableAjax);
    $('#open_ciqual_btn').on('click', getCiqualTableAjax);
    $('.btn.btn-primary').on('click', getCiqualTableAjax);
});