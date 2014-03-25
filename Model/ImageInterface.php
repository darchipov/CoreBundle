<?php

namespace Ekyna\Bundle\CoreBundle\Model;

/**
 * ImageInterface
 */
interface ImageInterface
{
    /**
     * Image has file
     * 
     * @return boolean
     */
    public function hasFile();
    
    /**
     * Get file
     * 
     * @return \Symfony\Component\HttpFoundation\File\UploadedFile
     */
    public function getFile();
    
    /**
     * Image has path
     * 
     * @return boolean
     */
    public function hasPath();
    
    /**
     * Get path
     * 
     * @return string
     */
    public function getPath();
    
    /**
     * Set path
     * 
     * @param string $path
     */
    public function setPath($path);
    
    /**
     * Image should be renamed
     * 
     * @return boolean
     */
    public function shouldBeRenamed();
    
    /**
     * Guess file name
     * 
     * @return string
     */
    public function guessFilename();
}
