const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    // 'id': {type: Number, required: true},
    'numero_sous_categorie': {type: Number, required: true},
    'sous_categorie': {type: String, required: true},
    'id_ciqual': {type: Number, required: true},
    'nom' : {type: String, required: true},
    'energie_ue_kj': Number,
    'energie_ue_kcal': Number,
    'energie_fib_kj': Number,
    'energie_fib_kcal': Number,
    'eau': Number,
    'proteines': Number,
    'proteines_brutes': Number,
    'glucides': Number,
    'lipides': Number,
    'sucres': Number,
    'amidon': Number,
    'fibres': Number,
    'polyols': Number,
    'cendres': Number,
    'alcool': Number,
    'acides_organiques': Number,
    'acides_gras_satures': Number,
    'acides_gras_monoinsatures': Number,
    'acides_gras_polyinsatures': Number,
    'acide_butyrique': Number,
    'acide_caproique': Number,
    'acide_caprylique': Number,
    'acide_caprique': Number,
    'acide_laurique': Number,
    'acide_myristique': Number,
    'acide_palmitique': Number,
    'acide_stearique': Number,
    'acide_oleique': Number,
    'acide_linoleique': Number,
    'acide_alpha_linolenique': Number,
    'acide_arachidonique': Number,
    'epa': Number,
    'dha': Number,
    'cholesterol': Number,
    'sel': Number,
    'calcium': Number,
    'chlorure': Number,
    'cuivre': Number,
    'fer': Number,
    'iode': Number,
    'magnesium': Number,
    'manganese': Number,
    'phosphore': Number,
    'potassium': Number,
    'selenium': Number,
    'sodium': Number,
    'zinc': Number,
    'retinol': Number,
    'beta_carotene': Number,
    'vitamine_d': Number,
    'vitamine_e': Number,
    'vitamine_k1': Number,
    'vitamine_k2': Number,
    'vitamine_c': Number,
    'vitamine_b1': Number,
    'vitamine_b2': Number,
    'vitamine_b3': Number,
    'vitamine_b5': Number,
    'vitamine_b6': Number,
    'vitamine_b9': Number,
    'vitamine_b12': Number
});

module.exports = mongoose.model('Product', ProductSchema);