#!/bin/sh



# check if a PathBase is defined
if test -n "$PathBase"; then

  # update base href
  path_stub='<base href=\"/"'
  path_final="<base href=\"/$PathBase/\""

  echo "s:$path_stub:$path_final:g"
  sed -i "s:$path_stub:$path_final:g" index.html

  #now update the global constant
  const_stub="PATH_BASE=\"/\""
  const_final="PATH_BASE=\"/$PathBase/\""

  echo "s:$const_stub:$const_final:g"
  find . -name "main.*.js" -print0 | xargs -0  sed -i "s:$const_stub:$const_final:g"
fi

nginx -g "daemon off;"


