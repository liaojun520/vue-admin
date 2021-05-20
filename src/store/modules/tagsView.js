const state = {
  visitedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    //存在相同的，替换上次历史记录  ==>> 可以更新query参数
    if (state.visitedViews.some(v => v.path === view.path)){  
      state.visitedViews.forEach((item,index)=>{
        if(item.path===view.path){
          state.visitedViews[index] = (
            Object.assign({}, view, {
              title: view.meta.title || 'no-name'
            })
          )
        }
      })
    }else{
     // 不存在相同的
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    }
    //如果历史记录超过6个，删除第2个
    if(state.visitedViews.length>6){
      state.visitedViews.splice(1,1)
    }
  },


  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
}

const actions = {
  //新增
  addView({commit,dispatch},route){
    dispatch('addVisitedView', route)
  },
  addVisitedView({commit},route){
    commit('ADD_VISITED_VIEW', route)
  },
  //删除
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}