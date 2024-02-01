function createDataset(fields, constraints, sortFields) {
	//DATASET QUE PEGA AS INFORMAÇÕES DE QUEM ABRIU O CHAMADO
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("COD_PESSOA");
	dataset.addColumn("SITUACAO");
	dataset.addColumn("NOME");
	dataset.addColumn("CODIGO");

	var codSentenca = '118';
	var codColigada = '0';
	var codAplicacao = 'G';

	var descricao = "%";

	for (var i = 0; i < constraints.length; i++) {
		log.info("const " + i + "------");
		log.info("Chave " + i + ": " + constraints[i].fieldName);
		log.info("Valor " + i + ": " + constraints[i].initialValue);

		if (constraints[i].fieldName == "NOME") {
			descricao = constraints[i].initialValue;
		}
	}

	var campos = new Array("COD_PESSOA", "SITUACAO", "NOME", "CODIGO" );

	var c1 = DatasetFactory.createConstraint("CODSENTENCA", codSentenca,
			codSentenca, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada,
			codColigada, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODAPLICACAO", codAplicacao,
			codAplicacao, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("NOME", descricao,
			descricao, ConstraintType.MUST);

	var arrayConstraints = new Array(c1, c2, c3, c4);

	var datasetRM = DatasetFactory.getDataset("ds_generic_rm_sql", campos,
			arrayConstraints, null);

	if (datasetRM == null || datasetRM == undefined) {
		throw "Ocorreu um erro ao executar a consulta ao RM. Favor entrar em contato com a equipe de TI.";

	} else {

		for (var i = 0; i < datasetRM.rowsCount; i++) {
			var COD_PESSOA = datasetRM.getValue(i, "CODPESSOA");
			var SITUACAO = datasetRM.getValue(i, "CODSITUACAO");
			var NOME = datasetRM.getValue(i, "NOME");
			var CODIGO = datasetRM.getValue(i, "CODIGO");
			dataset.addRow(new Array(COD_PESSOA, SITUACAO, NOME, CODIGO));
		}

		return dataset;
	}

	return null;

}

function converteDataBanco(dataBanco) {
	var splitData = dataBanco.split("T");
	if (splitData[0] != undefined && splitData[0] != null && splitData[0] != "") {
		var dataAmericana = splitData[0];
		var splitDataAmericana = dataAmericana.split("-");
		return splitDataAmericana[2] + "/" + splitDataAmericana[1] + "/"
				+ splitDataAmericana[0];
	} else {
		return "";
	}
}