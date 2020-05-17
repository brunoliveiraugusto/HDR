IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'USUARIO')
BEGIN
    CREATE TABLE USUARIO(
    ID_USUARIO INT IDENTITY NOT NULL,
    NOME_USUARIO VARCHAR(100) NOT NULL,
    LOGIN VARCHAR(20) NOT NULL,
	CHAVE_ACESSO VARCHAR(100) NOT NULL,
	DATA_NASCIMENTO DATETIME NOT NULL,
	INDICA_PACIENTE BIT NOT NULL,
    PRIMARY KEY (ID_USUARIO),
    );
END	

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CHAVE')
BEGIN
    CREATE TABLE CHAVE(
    ID_CHAVE INT IDENTITY NOT NULL,
	CHAVE_ACESSO VARCHAR(100) NOT NULL,
	DATA_CRIACAO DATETIME NOT NULL,
	DATA_CANCELAMENTO DATETIME NULL,
    ID_USUARIO INT NOT NULL,
	INDICA_CHAVE_ATIVA BIT NOT NULL,
	PRIMARY KEY (ID_CHAVE),
	FOREIGN KEY (ID_USUARIO) REFERENCES	USUARIO(ID_USUARIO)
    );
END	

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ARQUIVO')
BEGIN
    CREATE TABLE ARQUIVO(
    ID_ARQUIVO INT IDENTITY NOT NULL,
	ARQUIVO VARCHAR(MAX) NOT NULL,
	NOME_ARQUIVO VARCHAR(100),
	DATA_CRIACAO DATETIME NOT NULL,
	DATA_EXCLUSAO DATETIME NULL,
    ID_USUARIO INT NOT NULL,
	PRIMARY KEY (ID_ARQUIVO),
	FOREIGN KEY (ID_USUARIO) REFERENCES	USUARIO(ID_USUARIO)
    );
END	

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DADOS_MEDICO')
BEGIN
	CREATE TABLE DADOS_MEDICO(
		ID_DADOS_MEDICO INT IDENTITY NOT NULL,
		NOME_LOCAL_TRABALHO VARCHAR(100) NOT NULL,
		ENDERECO VARCHAR(200) NOT NULL,
		ESPECIALIDADE VARCHAR(50) NOT NULL,
		DATA_CADASTRO DATETIME NOT NULL,
		ID_USUARIO INT NOT NULL,
		PRIMARY KEY(ID_DADOS_MEDICO),
		FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
	);
END


