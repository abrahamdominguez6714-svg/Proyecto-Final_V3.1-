from dataclasses import dataclass, field


@dataclass
class Nodo:
    vecinos: dict[str, float] = field(default_factory=dict)


class Grafo:
    def __init__(self) -> None:
        self.nodos: dict[str, Nodo] = {}

    def agregar_nodo(self, nombre: str) -> None:
        self.nodos.setdefault(nombre, Nodo())

    def agregar_arista(self, origen: str, destino: str, peso: float) -> None:
        if peso < 0:
            raise ValueError("Dijkstra requiere pesos no negativos.")
        if origen not in self.nodos or destino not in self.nodos:
            raise KeyError("Ambos nodos deben existir antes de agregar una arista.")

        self.nodos[origen].vecinos[destino] = peso

    def dijkstra(self, inicio: str, destino: str) -> tuple[float, list[str]]:
        if inicio not in self.nodos or destino not in self.nodos:
            raise KeyError("El nodo de inicio y el de destino deben existir.")

        distancias = {}
        anteriores = {}
        visitados = set()

        for nombre in self.nodos:
            distancias[nombre] = float("inf")
            anteriores[nombre] = None

        distancias[inicio] = 0

        while len(visitados) < len(self.nodos):
            # Buscar el nodo no visitado más cercano.
            nodo_actual = None
            menor_distancia = float("inf")

            for nombre in self.nodos:
                if nombre not in visitados:
                    if distancias[nombre] < menor_distancia:
                        menor_distancia = distancias[nombre]
                        nodo_actual = nombre

            if nodo_actual is None:
                break

            # Si llegamos al destino, terminamos.
            if nodo_actual == destino:
                break

            visitados.add(nodo_actual)

            # Revisar vecinos.
            nodo = self.nodos[nodo_actual]

            for vecino, peso in nodo.vecinos.items():
                nueva_distancia = distancias[nodo_actual] + peso

                if nueva_distancia < distancias[vecino]:
                    distancias[vecino] = nueva_distancia
                    anteriores[vecino] = nodo_actual

        if distancias[destino] == float("inf"):
            return float("inf"), []

        # Construir el camino.
        camino = []
        actual = destino

        while actual is not None:
            camino.append(actual)
            actual = anteriores[actual]

        camino.reverse()
        return distancias[destino], camino
