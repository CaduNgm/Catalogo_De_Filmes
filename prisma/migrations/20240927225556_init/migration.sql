-- CreateTable
CREATE TABLE "Catalogo" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "lancamento" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,

    CONSTRAINT "Catalogo_pkey" PRIMARY KEY ("id")
);
