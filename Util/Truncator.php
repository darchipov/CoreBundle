<?php

namespace Ekyna\Bundle\CoreBundle\Util;

/**
 * Class Truncator
 * @package Ekyna\Bundle\CoreBundle\Util
 * @author  Etienne Dauvergne <contact@ekyna.com>
 */
class Truncator
{
    /**
     * @var \DOMDocument
     */
    private $tempDiv;

    /**
     * @var \DOMDocument
     */
    private $newDiv;

    /**
     * @var int
     */
    private $charCount;

    /**
     * @var string
     */
    private $encoding;


    /**
     * Constructor.
     *
     * @param string $html
     * @param string $encoding
     */
    public function __construct($html, $encoding = 'UTF-8')
    {
        $this->charCount = 0;
        $this->encoding = $encoding;

        $html = '<div>' . mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8') . '</div>';

        $this->tempDiv = new \DOMDocument('1.0', $encoding);
        $this->tempDiv->loadHTML($html, LIBXML_HTML_NOIMPLIED);
    }

    /**
     * Truncates the html string.
     *
     * @param int    $limit
     * @param string $endChar
     *
     * @return string
     */
    public function truncate($limit, $endChar = '&hellip;')
    {
        $this->newDiv = new \DOMDocument();
        $this->searchEnd($this->tempDiv->documentElement, $this->newDiv, $limit, $endChar);
        $newHtml = $this->newDiv->saveHTML();

        return $newHtml;
    }

    /**
     * Search the end node.
     *
     * @param \DOMNode $parseDiv
     * @param \DOMNode $newParent
     * @param int      $limit
     * @param string   $endChar
     *
     * @return bool
     */
    private function searchEnd(\DOMNode $parseDiv, \DOMNode $newParent, $limit, $endChar)
    {
        foreach ($parseDiv->childNodes as $ele) {
            if ($ele->nodeType != 3) {
                $newEle = $this->newDiv->importNode($ele, true);
                if (count($ele->childNodes) === 0) {
                    $newParent->appendChild($newEle);
                    continue;
                }

                $this->deleteChildren($newEle);
                $newParent->appendChild($newEle);
                $res = $this->searchEnd($ele, $newEle, $limit, $endChar);

                if ($res) {
                    return $res;
                } else {
                    continue;
                }
            }

            if (mb_strlen($ele->nodeValue, $this->encoding) + $this->charCount >= $limit) {
                $newEle = $this->newDiv->importNode($ele);
                $newEle->nodeValue =
                    substr($newEle->nodeValue, 0, strpos($newEle->nodeValue, ' ', $limit - $this->charCount))
                    . html_entity_decode($endChar);
                $newParent->appendChild($newEle);

                return true;
            }

            $newEle = $this->newDiv->importNode($ele);
            $newParent->appendChild($newEle);
            $this->charCount += mb_strlen($newEle->nodeValue, $this->encoding);
        }

        return false;
    }

    /**
     * Delete the given node recursively.
     *
     * @param \DOMNode $node
     */
    private function deleteChildren(\DOMNode $node)
    {
        while (isset($node->firstChild)) {
            $this->deleteChildren($node->firstChild);
            $node->removeChild($node->firstChild);
        }
    }
}