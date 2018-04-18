import React, {PropTypes} from 'react'
import {Button, Icon, Upload,Modal} from 'antd'
import {openNotice} from './../../../utils'
export const word2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAAHf3OLQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozN0ZGNUFDQThFQjExMUU2QUMwMDk3QTY5QTg1QkQ1RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozN0ZGNUFDQjhFQjExMUU2QUMwMDk3QTY5QTg1QkQ1RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3RkY1QUM4OEVCMTExRTZBQzAwOTdBNjlBODVCRDVFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3RkY1QUM5OEVCMTExRTZBQzAwOTdBNjlBODVCRDVFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MR91SgAABU9JREFUeNpi/P//PwNOgE1St/r3JpySMMCCpqMApyQQ9EPpE0BswYTFtIdALEnQToAAYsTrFaAj/mPjgzRh2Hm5lZURqOAnimvRvFEOIpjQvJEExHIwL6H7UxeKUQMBZBeSFf9ANEAAgb2iV/OnEMjuw+0nhhlAzZnIkQVzTx/U1P/ovoKKZ4C8D8S1KFGNHkaEwhJr2MEUwBSh0WdhfCYibGAD0VAnG5PlVGQ9+BMIHgAQQGRrBEcyMB7x6kZOAPA0ToyN6GEA0sOCRwEP0KavyHIoNpPjR5wJAIdzBfAVA1jLCiRxELUQiN+zEAiIGUC8DYg3QbPxf2iGZGQhEA2ZUMNU0eWYiPDbNKABd4D0CYyUw8jIiMup34GYE4hB0cINE7zUwsJI++jAmlbJsRUggMjOHWQDkIXkFAI4iqlNhOxhorL7fQlZTDUfovnWE4g/YLOHhdgyhgjAD8wIn6Ds4yA+wQYCvtKQRPAdWkgQbyGabz+DCkoygjYeOUcQVWbASmUsYqFArIoUGqAiYgWh0KEkla4GFV5Aeg20kP4O5EcC6XAg34cWFoKCzANoCcin76F8fSB/FZC5mVILdXCIb0dLzRdwpO6TNM2HuKpu9HwYQ2VLYwZF4Q0QQHS1kImePoPHHbDB9wFXuUcEAPU6+IBZ4RfeXhk1UiasmQ7EbDRpU+DyIT4LaRFnOC3E1QYFtcW+4AoRYNygOxLUOGVFi0NGetXq/+kRZ8QlfTSX8QKpT6QYREztz4JD42esYT5IS5DFwNDhIreNogGkPEiw7BwQp0F7UG+BIbWYKMugeeY6hamzEUgpEROMUljEbiInCChbG8pdjyWxKFISZ+pI7MNAl7MALbgG5ffgaghRmkBAjZ0SIK5F8uUxINVAVcuArg8A+QJo+CkgXQPkSyG1lI3JbjHjADVAi0yQHN0JxNm0ymfGUB8qwRo6oA4IqH1JUgmCpUTHFZQPgJQQGl8MlxlMRJR5T4HUbRzS8kDMi8bnxKJOlaYNVrpVMdD2CDfdmnLIg2LYEshbKgblk5HVIgYIMPqPDNERMDEMY4BRQgL7NKBuusAAuwtUW4bg6xvh7TPhSpawEXoKx56o1X4n2ZPI/hnsydIX2h3bhK8PSEnFjR66oHqRm0RtX4Ghf5sKniQpJllI9BiovzkPrXFADPgM1OsEdNRvAurKgDgCiJmxyKlAPXkT1uYmuSoYyDxHIGBhnf+PQLcJEJPnyEmWzmTEHNExDHT4XhxysKTIT5M8B/QYKLkk0NJzQDsOAj34B4scN00LFKClf4FU7CBIosxQt1C3tBwoAPTMB1IHb1ioGJopQGrmANadr0HVBBAfoqrngB5TAFKziVAKquu2Qdkgh0gjyYHms08ijZAg96pBTcJFULYbEGtiMVsUiA8ixy69kyWoAdABTGIvgAFyBshejNQ7dwWKf0EKsBdAShzKbQPKgYZ9QCVl7mDuFdRA89ASaFICgWaQx4COt0UaB6lB8vgUKLuWFDcPhOeygB6AjbX0QpNcG5QPGlXqhnp+DpB6BPIYkP0DGmuFg70/B8oTVVD2ZCAuBhXrQMcHAdmWQKyDNLFcB8Q9SDFJknup0vyCFij3SbAXtJpNADo2DzPjLpCCDdW9AmIJoDxshRhoMvwDjjYnCgCvkRngLg/I3mokj2UgeQwEQEOCJWj5lJnkJEKlmAOpBQ1mawxwXb8fGHNOVK0KoMlHE+hJJmgdxEpnTyH6iy0U9AoIeBKUl67SsE35AJbAkNbvDP22JRTIQwORqNlIbJ57C8TCtB5VpwC8JbtAGU5gWA/KAgB2nqOZK8o2MgAAAABJRU5ErkJggg=='

export const excel2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAAHf3OLQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NjRFMjhDODhFQjExMUU2OEJFNkI3MTM2MUQ0RjhGNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NjRFMjhDOThFQjExMUU2OEJFNkI3MTM2MUQ0RjhGNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NEUyOEM2OEVCMTExRTY4QkU2QjcxMzYxRDRGOEY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ2NEUyOEM3OEVCMTExRTY4QkU2QjcxMzYxRDRGOEY1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+haC5SAAABOpJREFUeNpi/P//PwNOgE1Sc1UsG05JGGBB01GAxP3ACNLJyMgIklAACtwHYncg3gmSZUJS+RtKgyS+ELQTIIAY8XoFaNd/bHyQJiZ0xdfDFjNieAXNGyAwAdmf/VDaFogPgyTRjf0ClcDuIOQwBwggsFe0Vsd9APL5cfuJgR3o0F/IGmFW8iP7ACYPEoOK/8SwHaQbl5PwJQ8WLAENi1QYqABibiCuRY4tFkKmA53aCTWwlipOxZ9A8ACAACJbI9iPwHjEp/sn0J8cGJmOkI0g/6OHAUp0ACW54dkGNUmDshUrSDNKIiHWj8i2Ys08JIUqqBhAMlkDSHngSRATsCY5kByyP2F+gzkVSIMyJyMTIX8ha0IGhPz4EqjpLpB+R6rGH0CsBMSfMUo9cpIcSdGB7k+yEzlAAJGtkVwAj39QzsJS0JHqfZRSFFv1x0RlD/yE5l42oqpPcgF6yEB9zEi0hUANvEDqEyWW4k2r5BTkBOJ0EbTcw7CHhQjNoPj4SYa9sUC9MPZ9aI4mKtFI4ZF7DA3KP1D6AQ51isSWNYSALNAXIUDLQFVDCpCvQEgDExVSJzs0/j8Sk3CYiDAUFEy38WT4JVDuKjwJT4HWqfQ/Man0LRUtfQIMma+DovAGCCC6WshET5/BGnuFQKqPAnNmAOMqk2CPjBqpEpoSNxEqo6kZjL74LKRFnOG1EFe99w9XRQkEPLjyEpKFtUA1zVjDk8oliScQf6B1nMHK1u1AipOUYCTVp6Bu6yeoXgEgxUa0ZeQ2AweiBPkOxAvJbvZhGYYgBC4g6QFZ/J4oy4CaQN0SHgp82g/LRsQEIy6LFiLHLZQ9h1ZxFg/0NR+QNgViFyAb5KgUojojZAJ4wwda6tAtNRLMLpT6TAToI2kg/ReIQfRTWvlsGTAI34IaOUD8HMh+BqTX0Mpn1kBfvUHKIq+B1FdKfaaDQ1weiIWRgxQqhg5O0qyKoVezgGCtQaum3H98CSSGykEZM7JaxAABRvfOBT0BE8MwBiglJLBPA2oxCAywmzYDcQiuoTpC5RXOZAkbnadVA5LEso5kT6J7bjAnS18GyNjnJnxjn1SruIGWqDJAJp5IAV+BoX+bCp4kOSZZSPAYK5CaB8S8JDruM1CvE9BRvwmoKwPiCCBmxiKnAvXkTQakwUeSqoKBzHMEAhY2ZwZqlgsQm+dITZbOZMQc0TEMdPheHHKwpMhPkzwH9BgouSTQ0nNAOw4CPfgHixw3TQsUoKWgfkzsIEiizFC3ULe0HCgA9MwHYnqjNPEcdKZj5gDWm6D+YwgQH6Kq56CLMGaTqA00OASLjVQG1MG+X9CA+gctQBKIME8UiA+ix+5AhXQ8EO8GJrd8IA0a4rkAFQdV9qCBxzxo8yuBEksGMs9tAcb6HKBHQDFnCKpmYFUBkD0BSOUP9S5PCtAjZ6GFBsxjp6jhscHgOdAoljHUU/xQT5oBqW1D3XOBQI9EQz0Gmoj5AKTXQT3ojWtQZLDnuZdArA0adwR6RowBsv5ICOZhoBhIXgsovxTI3gVkX4WWhgPiuYdAfAOINYhULw7Eb5DWNKADMQLyuMB+qnsOGMKgprgm0DGgJK4JxKx0TgmI/uL/RbRJlkAL/kGTEK3alA+gTD3YBNywaFtCgTw0ED+Rm+dAkwvCtB5VpwC8JUXx6KDsUAUAeIxfEGY+w0sAAAAASUVORK5CYII='

export const ppt2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAAHf3OLQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MDI5NkZFMThFQjExMUU2QTNBMEQ3REQ5Mzg1RjE3MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MDI5NkZFMjhFQjExMUU2QTNBMEQ3REQ5Mzg1RjE3MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUwMjk2RkRGOEVCMTExRTZBM0EwRDdERDkzODVGMTcwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUwMjk2RkUwOEVCMTExRTZBM0EwRDdERDkzODVGMTcwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+adov0QAABGZJREFUeNpi/P//PwNOgE3y5xQDNpySMMCCpqMAifuBCUlCAUj1s+dcmACkBYF4PrLO31BFD4CUPEE7AQKIEa9XgMb8x8YHaWJCVwx0ECOGV9C8AQITkF3bjy7JxIAPoDsIOcwBAgjslV9TDT8A+fx4zGAHOvQXskaYlfzIPoDJg8Sg4j8xbAfpxuUkfMmDBYu/QJF6Hz0s0QxnZCLGBqwuItep+BMIHgAQQGRrBAcOMB7x6f4JDCAOjExHyEaQ/9HDACU6gJLcQOoLliQNylasIM0oiYRYPyLbijXzkBSqjIyMyCZrACkPnKkdWExgTXJAcB2J/RCoUAFoGCso8KEG9xOV5KCB8htdnOy0SkijDBax3yRFB3oCIDo60J1LdiIHCCCyNZIL4PEPyllYCjpSvY9SimKr/pio7IGf0NzLRlT1SS5ADxmojxmJthCogRdIfaLEUrxplZyCnECcLoKWexj2sBChGRQfP8mwNxaoF8YG1XtKxCYaKTxyD5GDEsouxKJOkSaJBugjeSxtGuqnUlLin4kI14PairdxSMsTaZkCrVPpf2JS6VsqWvoEGDJfB0XhDRBAdLWQiZ4+gzX2QJm0jwJzZgDjKpNgj4waqRKaEjcRKqOpGYy++CykRZzhtRBXvfcPV0UJBDy48hKShbVANc1U6bgQiD9PIP5A6ziDla3bgRQnKcFIqk9B3dZPUL0CQIqNaMvIbQYORAnyHYgXkl2hYhmGIAQuIOkBWfyeKMuAmj6DkjsFPu2HZSNifMZDQkO2D0djiDrtEqAFC4BUPBDvAVruCuQX0iOBPCe650NBJk4AUglQX+6jqWVIwTgIa2oKfAVqY4pQswTRwSMHaoZzE9B/kmZVDL2aBQRrDVolkP/4EkgMlYMyZmS1iAECjO6dC3oCJoZhDFBKSGCfBtRiEBhgN20G4hBcQ3WEyiucyRI2Ok+rBiSJZR3JnkT33GBOlr4MkLHPTfjGPqlWcQMtUSWi7kQHX4Ghf5sKniQ5JllI8BhoamMeEPOS6LjPQL1O2GY40EAZEEcAMTMWORWoJ28yIA0+klQVDGSeIxCwsDmzj0C3CRCb50hNls5kxBzRMQx0+F4ccrCkyE+TPAf0GDO0b0EzzwHtOAj04B8sctw0LVCAlv4FUrGDIIkyQ91C224OvQDQMx8YcA+20dZzwNBMAVIzB7DefA2qJoD4ELW73gpAajY5eQxatWCU4EAsCcSWDNinrbEBUSA+iB67A5ks3wGTWwE0gGygdRloxu8dEB8AyoEqbpBjjwGxxVDuFYCS9XwgXgbEO4D4B9BjTEAP/ocmd/qPm1ARdADxAmjfHTSzdRcao6ARxPqh7jk3IHaCuQnoKdAcsT6lKWuweM4IiP1He+J0jrmHQHwDiDVI1CdP5eGv/VT3HLRE0wSVbiAaiFnpHEHw/uL/bBrlOaAFoPnIqzRsUz6AMvVgE3DDom0JS8bQQPxEbp57C8TCtB5VpwC8JUXx6KDsUAUAHio3BdvXmtYAAAAASUVORK5CYII='

export const pdf2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAAHf3OLQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OUNFODQyNThFQjExMUU2QkZFMThFOTI2Njg4MzM5QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OUNFODQyNjhFQjExMUU2QkZFMThFOTI2Njg4MzM5QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5Q0U4NDIzOEVCMTExRTZCRkUxOEU5MjY2ODgzMzlBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5Q0U4NDI0OEVCMTExRTZCRkUxOEU5MjY2ODgzMzlBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mGKiIgAABYBJREFUeNpi/P//PwNOgE3ysoMDG05JGGBB01EAYzMyMn5gBOkEMkASCkCx+0A8EYjzQQqYkDT+htIBeB0EAwABxIjXK0C7/mPjgzQxoSvWPXCAEcMryN6AgglMSDomACkDIO6HYhSdD4CUPF4HIXsRIIDAXrni6PgByOfH7ScGdqC1v5A1wtzDj+wDmDxIDCr+E8N2kG5cTsKXPFiwBDQoUi8AMQ8QMwPxRyRvfITSAkzYTAQ6TwCqCQQWIEnxww0h16n4EwgeABBAZGsEBw4wHvHp/gn0MwdGpiNkI8j/6GGAEh1ASW4g9QVLkgZlK1aQZpREQqwfkW3FmnlIClVQMQA32dFBg+E/gwcuDaA8hjXJATVdR0pmX8AiDAy8sOQGdDIoQzKy4DAYpIkPiJWB+DwsUJD9ic+PnwgmADxgGxA/h9r0EKXUIyfJkRQd6KmH7EQOEEBkayQXwAMVlLOwFHSkeh+lFMVW/TFR2QM/obmXjdxkQxRADxmojxmJthCogZdQAidkKd60Sk5BTiBOF111cuLGZg8LEZpB8fGTVEv//fsXC9QL44IaM0rEJhoppCAzBGINKPsHlC8DxDpQsUY0tTCsSEwhhS2eLgDxTSgXVgGVgnIVtGpoQFMLqtEVyE6lOOJ5ChCvBxp+EChfRqhpBC9p8GV8oOZbQEqVgnSkoLN//0NaptL/0NoZbyp9S0VLnwBD6+ugKLwBAoiuFjLR02ewxl4hkOqjwJwZwLjKJNgjo0aqhKbETYTKaGoGoy8+C2kRZ3gtxFXv/cNVUYJ6NbjyEpKFtUA1zVjDk8oliScQf6B1nMFqge1AipOUYCTVp6Bu6yeoXlA/kI1oy8htBg5ECfIdiBeS3ewDljAFJJahF5CGLkAWvyfKMqCmz0CLeCjwaT8sGxHjM5BFf4D4K1KvjAFt1IAfbXToGxKfk9Q42wrEwkDsAB1xUEQagQCJiSAlqmVALAYVB+E15CQQUGv6PBD/BRr8AEkcJPYGGNxqQLoVqWl4HoqjSG5xAS34AAt7oMHeWJQ4AvEBII6BOgaj08tCQjEkAEtVOMApIPZBGh26T4t8BvKRJtA3oCBroqRXDgNuQHwJi29hcScKZHNB2SFA7EKuZTqgfA3Esljk5LGIcUMxDJykWRVDr2YBwVqDVk25//jiLIbKQRkzslrEAAFG984FPQETwzAGLGgtDlDZLjDAbtoMKmVxDdURKq9wJkvY6DytGpAklnUkexLdc4M5WfoyQMY+N+Eb+6RGxQ0LXVW0epIY8BUY+rep4EmSY5KU9hYrkJoHbVGSAj4D9ToBHfWbgDrQUFwEA2IiDhmoQD15kwFp8JGkqmAg8xyBgIXNmX2E9gOIynOkJktnMmKO6BgGOnwvDrlfWHpRVE2WoOSSQEvPAe04CPTgHxxtYtoVKEBL/wKp2EGQRJmhbqFuaTlQALmnSrOqAE9opgCpmQNYb76G9h0PUdVz0G727AGOXFEgPogeu9ROlhuBSSgASwCAeuZOQAxal6MMFTaEzmOhF1paQAwat09EkloIVJuAJ4BB5ubTJc9hGWA5BHScPZDeApTbAaTdcTgMVFF1A9UmQZP6LaTAwDkYM5AFCmhEDzmG8PU6QMmqDOiJS0APLgXSlUD+KiR5UMHSiKZHA4jD6em5T0jNJG7ooFEXkAYNyLKS0M9EL/JBDWgDNDFJesccHynJB0u+XQwMDJAHW9HkQHnXfzAlS0J1WAE0RmH5SgOIpwKZWVQdQyGn4Qx0CEjtNWjaH0iwX2f/fieqxhwwIEABoglNRppE5ilqAnh/8T+tkiXQAtB85FUatikfQJl6sAm4YdG2hAJ5aCB+IrdAeQvEwrQeVacAvCW7QBluYFgPygIATGuTeohnoncAAAAASUVORK5CYII='


const Dragger = Upload.Dragger;

const FileUpload = React.createClass({
  getInitialState(){
    return {
      list: [],
      fileList:[],
      previewVisible: false,
      previewImage: '',
    };
  },
  onDeleteDone(file, fileList){//删除成功的回调方法
    this.setState({fileList});
    this.props.getList(fileList);
  },
  componentWillReceiveProps(newProps){
    var fileList = newProps.defaultList.map(function (val,idx) {
      var obj = {};
      obj.uid=idx;
      obj.status='done';
      obj.url=val;
      return obj
    });
    this.setState({fileList:fileList});
  },
  componentDidMount(){
    const {defaultList} = this.props;
    var fileList = defaultList.map(function (val,idx) {
      var obj = {};
      obj.uid=idx;
      obj.status='done';
      obj.url=val;
      return obj
    });
    this.setState({fileList:fileList});
  },
  onUploadDone(file, fileList){
    var t = '',//配置非图片文件的缩略图
      uidTmp = file.uid,
      str = file.name;
    if(str.match(/\.doc|\.docx/i)){
      t = word2;
    }else if(str.match(/\.ppt|\.pptx/i)){
      t = ppt2;
    }else if(str.match(/\.xls|\.xlsx/i)){
      t = excel2;
    }else if(str.match(/\.pdf/i)){
      t = pdf2;
    }
    for(var i=0; i<fileList.length; i++){
      if(fileList[i].uid == uidTmp){
        fileList[i].url = file.response.data;
        fileList[i].thumbUrl = t||file.url;
      }
    }
    this.setState({fileList});
    this.props.getList(fileList);
  },//上传成功的回调方法
  handlePreview(file){
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
  },
  handleCancel(){
    this.setState({ previewVisible: false })
  },
  render(){
    const self = this;
    const {previewVisible,previewImage,fileList} = this.state;
    const {accept, labelText,url} = this.props;
    const countLimit= this.props.countLimit||1;
    const btnGroupStyle = {
      width: '100%',
      height:'100px'
    };
    const uploadProps = {
      action: url || `/show/operateType/upload-op-poster`,
      listType: 'picture-card',
      onPreview: this.handlePreview,
      fileList:fileList,
      onChange: (param) => {
        let file = param.file;
        let fileList = param.fileList;
        if (file.status === 'done') {
          console.log('done: 上传完成，成功与否自行判断');
          self.onUploadDone(file, fileList);
        } else if (file.status === 'removed') {
          console.log('removed: 删除, 将删除结果同步到modal组件的state中');
          self.onDeleteDone(file, fileList)
        } else if (file.status === 'uploading') {
          this.setState({fileList});
          console.log('uploading: 上传中');
        } else if (file.status === 'error') {
          console.log('error: 上传失败');//上传失败
        }
      }
    };
    const uploadButton = (
      <div>
        <Icon type="upload" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div  className={"csmuploadContext "+(countLimit==1?"uploaderNoAnimate":"")}>
        <div className="csmuploadHeader">{labelText}</div>
        <div style={btnGroupStyle}>
          <Upload {...uploadProps} >
            {countLimit ==  fileList.length  ? null : uploadButton}
          </Upload>
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
});


FileUpload.propTypes = {
  defaultList: PropTypes.array,
  countLimit: PropTypes.number,
  labelText: PropTypes.string,
  accept: PropTypes.string,
  index: PropTypes.string,
  fileBelong: PropTypes.string,
};

export default FileUpload
