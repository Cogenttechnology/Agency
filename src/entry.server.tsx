import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  // Use renderToReadableStream for React 19 / Web Streams
  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming errors in dev
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );

  if (isbot(userAgent)) {
    await body.allReady;
  }

  shellRendered = true;

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
