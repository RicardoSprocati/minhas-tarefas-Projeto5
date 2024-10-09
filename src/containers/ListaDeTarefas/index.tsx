import Tarefa from '../../componentes/Tarefa'
import { MainContainer, Titulo } from '../../styles'

import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtroTarefas = () => {
    let tarefaFiltradas = itens

    if (termo !== undefined) {
      tarefaFiltradas = tarefaFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefaFiltradas = tarefaFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefaFiltradas = tarefaFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefaFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltrado = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const tarefas = filtroTarefas()
  const mensagem = exibeResultadoFiltrado(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              titulo={t.titulo}
              descricao={t.descricao}
              prioridade={t.prioridade}
              status={t.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
