import React from 'react';
import PropTypes from 'prop-types';
import { pathToRegexp } from 'path-to-regexp';


const _instances = [];
const register = (comp) => _instances.push(comp)
const unregister = (comp) => _instances.slice(item=>item===comp,1)


/*
 @params
 pathname: string
 options: object
*/
const matchPath = ( pathname='/', options  ) => {
    const { path, exact = false } = options

    if(!path){
        return {
            path: null,
            url: pathname,
            isExact: true
        }
    }

    let key = []
    let res = pathToRegexp(path,key,{end:false})
    let match = res.exec(pathname)

    // console.log(vals)

    if(!match){
        return null
    }

    const [url, ...values] = match
    const isExact = pathname===url

    if (exact && !isExact) return null;
    return {
        path,
        url: path === "/" && url === "" ? "/" : url,
        isExact,
        params: key.reduce((acc,key,i)=> { 
            acc[key.name]=values[i]
            return acc
        },{} )
    }
}


class Route extends React.Component{

    componentDidMount(){
        register(this)
        console.log('registering',_instances)
        document.addEventListener("popstate", this.forceUpdate);
    }

    componentWillUnmount(){
        unregister(this)
        console.log('unregistering',_instances)
        document.removeEventListener("popstate",this.forceUpdate)
    }

    render(){

        const {
            path,
            exact,
            component,
            render,
            children
        } = this.props

        const match =  matchPath( window.location.pathname, { path, exact } )

        if(!match){
            return null
        }

        if(component){
            return React.createElement(component, {match})
        }

        if(render){

            return render({match})
        }

        if(children){
            return React.cloneElement( children, { match } )
        }

        return null

    }
}

Route.propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func,
}


class Link extends React.Component{

    handleClick = (e) => {
        const { to, replace } = this.props
        e.preventDefault()
        // change route
        replace
        ?window.history.replaceState({},null,to)
            :window.history.pushState({},null,to)
        _instances.forEach(instance=>instance.forceUpdate())
    }

    render(){
        const { to, children } = this.props
        return(
                <a href={to} onClick={this.handleClick}>
                    {children}
                </a>
        )
    }

}

Link.propTypes = {
    to: PropTypes.string,
    replace: PropTypes.bool
}

export { Route, Link }  